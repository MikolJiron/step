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
   *   I get sets of representing all of the mandatory and optional attendees.
   *   I also get the duration of the meeting request.
   *   I calculate all of the minutes in which mandatory attendees are not booked, represented
   *     by a BitSet.
   *   I then calculate all of the minutes in which optional attendees are not booked,
   *     represented by a BitSet.
   *   Next, I calculate all of the minutes in which BOTH mandatory and optional 
   *     attendees are not booked, again, represented by a BitSet.
   *   Now I convert this BitSet representing BOTH back to a List of TimeRanges.
   *   If there are TimeRanges in which BOTH mandatory and optional attendees can attend,
   *     I return this List.
   *   Otherwise, I return the List of TimeRanges in which just mandatory attendees can attend.
   *
   * @param scheduledEvents - The events that have already been scheduled for the day.
   * @param request - The MeetingRequest that contains all of the desired mandatory attendees 
   *   and desired event length for that request.
   * @return - A collection of available TimeRanges that meet the MeetingRequest criteria.
   */
  public Collection<TimeRange> query(Collection<Event> scheduledEvents, MeetingRequest request) {
    // First I get the list of all the people that need to attend the meeting request.
    Set<String> requestedEventAttendees = new HashSet(request.getAttendees());
    Set<String> requestedEventOptionalAttendees = new HashSet(request.getOptionalAttendees());

    // Get the duration of the meeting request.
    long requestEventDuration = request.getDuration();

    // Get all of the minutes in which mandatory attendees are not booked.
    BitSet minutesInDayNotBooked = createBitSetOfNonBookedTimes(scheduledEvents, requestedEventAttendees);

    // Get all of the minutes in which optional attendees are not booked.
    BitSet minutesInDayNotBookedOptional = createBitSetOfNonBookedTimes(scheduledEvents, requestedEventOptionalAttendees);

    // Get all of the minutes in which both mandatory AND optional attendees are not booked.
    BitSet minutesInDayNotBookedForBoth = (BitSet) minutesInDayNotBooked.clone();
    minutesInDayNotBookedForBoth.and(minutesInDayNotBookedOptional);

    // Now we create all of the TimeRanges based off the BitSet for which both mandatory 
    // and optional attendees are able to attend. 
    List<TimeRange> timeRangesNotBookedForBoth = convertBitSetToTimeRanges(requestEventDuration, minutesInDayNotBookedForBoth);

    // If there exist any TimeRanges in which both optional and mandatory attendees can attend, 
    // then return those TimeRanges.
    if(timeRangesNotBookedForBoth.size() > 0) {
      return timeRangesNotBookedForBoth;
    } else if(requestedEventOptionalAttendees.size() > 0 && requestedEventAttendees.size() == 0) {
      // Handle edge case when there is at least one optional attendee, but no mandatory attendees.
      // If this is the case, then no TimeRanges should be available.
      return new ArrayList<TimeRange>();
    }

    // If there are no TimeRanges in which both optional and mandatory attendees can attend,
    // then simply return the TimeRanges in which JUST mandatory attendees can attend.
    return convertBitSetToTimeRanges(requestEventDuration, minutesInDayNotBooked);
  }

  /**
   * This helper method returns a BitSet representing all of the TimeRanges in which a set of
   * requestedEventAttendees is not-booked.
   *   Overview of Procedure:
   *   Iterate through each Event in my Collection of events and add their TimeRanges to the BitSet
   *   if and only if the event contains at least one attendee from my Set of requested attendees.
   * @param scheduledEvents - The events that have already been scheduled for the day.
   * @param requestedEventAttendees - List of attendees that I want to see when they're free.
   * @return - The BitSet representing all of the TimeRanges in which a set of
   *   requestedEventAttendees is not-booked.
   */
  public static BitSet createBitSetOfNonBookedTimes(Collection<Event> scheduledEvents, Set<String> requestedEventAttendees) {
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

    return minutesInDayNotBooked;
  }

  /**
   * This helper method returns a List of TimeRanges that are at least as long as the
   * requestedEventDuration, converted from the BitSet representing the 
   * minutes in a day in which an event occurs.
   * @param requestedEventDuration - The duration for which needs to be the minimum required event duration.
   * @param minutesInDay - A BitSet representing the minutes when events in a day occur or will occur.
   */
  public static List<TimeRange> convertBitSetToTimeRanges(long requestEventDuration, BitSet minutesInDay) {
    // We create all of the TimeRanges based off the BitSet.
    List<TimeRange> timeRanges = new ArrayList<TimeRange>();
    int index = 0;

    // We iterate through the BitSet until there are no more TimeRanges left to create.
    while(index < TimeRange.END_OF_DAY + 1) {
      // Get the start and end times of the TimeRange I want to add to my list.
      int newStartTime = minutesInDay.nextSetBit(index);
      int newEndTime = minutesInDay.nextClearBit(index) - 1;

      // Whenever there are no more clear bits = 0, we set the endTime to END_OF_DAY since every minute
      // afterwards is now available to create this new event.
      if(minutesInDay.nextClearBit(index) == TimeRange.END_OF_DAY) {
        newEndTime = TimeRange.END_OF_DAY;
      }
      // Now, we should create the new TimeRange.
      TimeRange nonBookedTime = TimeRange.fromStartEnd(newStartTime, newEndTime, /** inclusive= */ true);
      
      // We must check if the TimeRange is long enough, if so, then we add to the list.
      if(nonBookedTime.duration() >= requestEventDuration) {
        timeRanges.add(nonBookedTime);
      }
      
      // Our index that we should look for to find the next set of bits should be
      // the nextSetBit after my last setBit.
      index = minutesInDay.nextSetBit(newEndTime + 1);

      // If there are no more set bits = 1, that means we've reached the end of available times
      // and we should break out of the loop.
      if(index < 0) {
        break;
      }
    }

    return timeRanges;
  }
}
