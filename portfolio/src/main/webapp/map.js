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

class Map {
  constructor() {
    this.dukeLocation = {lat: 36.001111, lng: -78.938889};
    this.wilsonLocation = {lat: 35.9974, lng: -78.9414};
    this.chapelLocation = {lat: 36.0019, lng:78.9403};
  }
  
  /** Creates a map and adds it to the page. */
  createMap() {
    const map = new google.maps.Map(
      document.getElementById('map'),
      {center: this.dukeLocation, zoom: 16}
    );

    const dukeMarker = new google.maps.Marker({
      position: this.dukeLocation,
      map: map,
     title: 'Duke University'
    });

    const wilsonMarker = new google.maps.Marker({
      position: this.wilsonLocation,
      map: map,
     title: 'Wilson Recreation Center'
    });

    const chapelMarker = new google.maps.Marker({
      position: this.chapelLocation,
      map: map,
     title: 'Duke Chapel'
    });
  }
}

export {Map};
