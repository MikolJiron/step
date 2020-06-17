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
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public final class FindMeetingQuery {
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
      return Arrays.asList();
    }

    // Find all of the events containing ANY of the desired attendees.
    // Add any such events' TimeRanges to this list.
    List<TimeRange> scheduledTimeRanges = new ArrayList<>();

    // Iterate through each of the already scheduled events and find any and all events that have a 
    // desired attendee.
    for(Event event: scheduledEvents) {
      Set<String> eventAttendees = event.getAttendees();

      // Get the Set intersection between THIS event's attendees and my requested event's attendees.
      eventAttendees.retainAll(requestedEventAttendees);
      
      // If the set intersection is not empty, then I add that event's 
      // TimeRange to my list of scheduledTimeRanges.
      if(!eventAttendees.isEmpty()) {
        scheduledTimeRanges.add(event.getWhen());
      }
    }

    // Sort my current list of TimeRanges before beginning to merge overlapping ones.
    // I want to sort by START time in ascending order.
    Collections.sort(scheduledTimeRanges, TimeRange.ORDER_BY_START);

    // Combine any overlapping TimeRanges into one larger TimeRange. 
    // Not sure what to do here yet. The plan might be to use something similar to mergesort, 
    // Combining overlapping TimeRanges until there are none left to combine.

    // Next, we create a new List of TimeRanges, in which each new TimeRange consists of the
    // start time and end time of an already scheduled meeting. There may also exist two time ranges
    // one whose start is the START_OF_DAY and another whose end is END_OF_DAY. This is
    // only possible when the first scheduled meeting's start is after START_OF_DAY and the last
    // scheduled meeting's start is before END_OF_DAY respectively. We also check if the newly
    // created TimeRange is at LEAST as long as the MeetingRequest duration. If not, then don't include it.

    // The result will be a list of TimeRanges in which every attendee in the MeetingRequest is free/ able to
    // attend. All of these TimeRanges will satisfy the duration requirement so we can finally return.

    return new ArrayList<>();
  }
}
