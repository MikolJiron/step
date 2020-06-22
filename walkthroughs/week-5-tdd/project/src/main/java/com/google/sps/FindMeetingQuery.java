// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.BitSet;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * This class contains the query() method which returns the TimeRanges that meet the criteria of
 *   a specific MeetingRequest.
 */
public final class FindMeetingQuery {
  /**
   * This method takes in a Collection of scheduledEvents and a MeetingRequest and returns all of the 
   *   available TimeRanges that meet the MeetingRequest criteria. 
   * All desired attendees must be able to attend, and the TimeRanges must be long enough for the 
   *   request to be met.
   * Overview of algorithm:
   *   First I need to create a set for all of the people that I want to attend my requested event.
   *     and get the duration of that event.
   *   Next, I handle edge cases for when there are no attendees for my request and when the duration
   *     is out of bounds.
   *   Now, I make a BitSet that represents all of the minutes in a day. 
   *   I iterate through each event that has already been scheduled and compare that event's attendee set
   *     to the set of attendees for my requested event. 
   *   If there is any intersection between the two sets, that means one of my requested attendees is booked for
   *     that event.
   *   I then add that event's TimeRange to my BitSet by setting all of the bits from the TimeRange.start() to
   *     TimeRange.end() to 1.
   *   As I add new TimeRanges, it doesn't matter if events overlap since a bit (minute) will already be set to 1
   *     if at LEAST one attendee is booked during that event.
   *   Once I'm done, I will have all of the TimeRanges in which a person is booked represented in my BitSet.
   *   To know all of the TimeRanges in which a person IS NOT booked, I simply flip all of the bits in my BitSet.
   *   Now I convert the inverted BitSet back to TimeRanges and only add them to my list of TimeRanges to return,
   *     if they are at least as long as the requested event's duration.git s
   *   Once I'm done, I will have all of the TimeRanges I need.
   * @param scheduledEvents - The events that have already been scheduled for the day.
   * @param request - The MeetingRequest that contains all of the desired mandatory attendees 
   *   and desired event length for that request.
   * @return - A collection of available TimeRanges that meet the MeetingRequest criteria.
   */
  public Collection<TimeRange> query(Collection<Event> scheduledEvents, MeetingRequest request) {
    // First I get the list of all the people that need to attend the meeting request.
    Set<String> requestedEventAttendees = new HashSet(request.getAttendees());

    // Get the duration of the meeting request.
    long requestEventDuration = request.getDuration();

    // Handle edge cases.
    // If the request has no attendees, return WHOLE_DAY.
    // Else if the duration of the meeting request > WHOLE_DAY, return empty list.
    // Same thing if the duration is <=0;
    if(requestedEventAttendees.equals(Collections.emptySet())) {
      return Arrays.asList(TimeRange.WHOLE_DAY);
    } else if(requestEventDuration > TimeRange.WHOLE_DAY.duration() || requestEventDuration <= 0) {
      return new ArrayList<>();
    }

    // This BitSet, whose bits represent all of the minutes in a day, will be filled in so
    // that all minutes that are already booked by a desired attendee are set to 1.
    BitSet minutesInDayBooked = new BitSet(TimeRange.END_OF_DAY + 1);

    // Iterate through each of the already scheduled events and find any and all events that have a 
    // desired attendee.
    for(Event event: scheduledEvents) {
      Set<String> eventAttendees = new HashSet(event.getAttendees());

      // Get the Set intersection between THIS event's attendees and my requested event's attendees.
      eventAttendees.retainAll(requestedEventAttendees);
      
      // If the set intersection is not empty, then I add that event's 
      // TimeRange to my BitSet.
      if(!eventAttendees.isEmpty()) {
        // Set the bits for the minutes that are booked.
        TimeRange bookedTimeRange = event.getWhen();
        minutesInDayBooked.set(bookedTimeRange.start(), bookedTimeRange.end());
      }      
    }

    // Now that we have all of the bits for every minute booked, 
    // we flip all the bits to know which minutes are NOT booked.
    BitSet minutesInDayNotBooked = (BitSet) minutesInDayBooked.clone();
    minutesInDayNotBooked.flip(0, TimeRange.END_OF_DAY);

    // Now we create all of the TimeRanges based off the BitSet containing all "free" not-booked minutes.
    List<TimeRange> timeRangesNotBooked = new ArrayList<TimeRange>();
    int index = 0;
    while(index < TimeRange.END_OF_DAY + 1) {
      // Get the start and end times of the TimeRange I want to add to my list.
      int newStartTime = minutesInDayNotBooked.nextSetBit(index);
      int newEndTime = minutesInDayNotBooked.nextClearBit(index) - 1;

      // Whenever there are no more clear bits = 0, we set the endTime to END_OF_DAY since every minute
      // afterwards is now available to create this new event.
      if(minutesInDayNotBooked.nextClearBit(index) == TimeRange.END_OF_DAY) {
        newEndTime = TimeRange.END_OF_DAY;
      }
      // Now, we should create the new TimeRange.
      TimeRange nonBookedTime = TimeRange.fromStartEnd(newStartTime, newEndTime, /** inclusive= */ true);
      
      // We must check if the TimeRange is long enough, if so, then we add to the list.
      if(nonBookedTime.duration() >= requestEventDuration) {
        timeRangesNotBooked.add(nonBookedTime);
      }
      
      // Our index that we should look for to find the next set of bits should be
      // the nextSetBit after my last setBit.
      index = minutesInDayNotBooked.nextSetBit(newEndTime + 1);

      // If there are no more set bits = 1, that means we've reached the end of available times
      // and we should break out of the loop.
      if(index < 0) {
        break;
      }
    }

    return timeRangesNotBooked;
  }
}
