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
    // throw new UnsupportedOperationException("TODO: Implement this method.");
    
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

    for(Event event: scheduledEvents) {
      Set<String> eventAttendees = event.getAttendees();
      // Get the Set intersection between THIS event's attendees and my requested event's attendees.
      eventAttendees.retainAll(requestedEventAttendees);
      if(!eventAttendees.isEmpty()) {
        scheduledTimeRanges.add(event.getWhen());
      }

    }


    return new HashSet<>();
  }
}
