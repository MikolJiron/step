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
    // Information for each location on the map.
    this.dukeLocation = {lat: 36.001111, lng: -78.938889};
    this.wilsonLocation = {lat: 35.9974, lng: -78.9414};
    this.chapelLocation = {lat: 36.0019, lng: -78.9403};
    this.keohaneLocation = {lat: 35.9989, lng: -78.9373}
    this.dukeDescription = '<p class=info-window-description> \
      This is the center of Duke University, founded in 1838. \
      I\'m currently a sophomore there studying computer science.</p>';
    this.wilsonDescription = '<p class=info-window-description> \
      This is Wilson Recreation Center, with a huge gym, several \
      basketball courts, olympic-sized pools, a rock-climbing wall, \
      and other cool features. I like going there to work out with \
      my friends all the time.</p>';
    this.chapelDescription = '<p class=info-window-description> \
      This is Duke Chapel, one of the tallest university chapels in \
      the world. It\'s architecture is Collegiate Gothic, many of Duke\'s \
      academic buildings have this style of architecture. It\'s absolutely \
      breathtaking.</p>';
    this.keohaneDescription = '<p class=info-window-description> \
      This is Keohane 4E, my dorm sophomore year. It is in a great location \
      far enough away from main quad without being too far to be \
      incovenient to walk to class. \
      It\'s also one of the nicest dorms on campus.</p>';
  }
  
  /** Creates a map and adds it to the page. */
  createMap() {
    const map = new google.maps.Map(
      document.getElementById('map'),
      {center: this.dukeLocation, zoom: 16}
    );

    const dukeMarker = this.createMarker(this.dukeLocation, map, 'Duke University',
      this.dukeDescription);
    const wilsonMarker = this.createMarker(this.wilsonLocation, map,
     'Wilson Recreation Center', this.wilsonDescription);
    const chapelMarker = this.createMarker(this.chapelLocation, map, 'Duke Chapel',
      this.chapelDescription);
    const keohaneMarker = this.createMarker(this.keohaneLocation, map, 'Keohane 4E', 
      this.keohaneDescription);


  }

  /** Adds a marker to the map.
   * @param {*} position - Lat,Lng object indicating global coordinates.
   * @param {*} map - Instance of a Google Map. 
   * @param {String} title - Title of the marker.
   * @param {String} description - String containing Paragraph element
   *   with a description of each location.
   * @return {*} - Returns the map marker.
   */
  createMarker(position, map, title, description) {
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title
    });
    this.createInfoWindow(marker, description);
    return marker;
  }

  /** 
   * Adds an info window to a marker and displays it only when clicked on.
   * @param {*} marker - Marker to create an info window on.
   * @param {String} description - Description to be added to info window content.
   * */
  createInfoWindow(marker, description) {
    const infoWindow = new google.maps.InfoWindow({
      content: description
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }
}

export {Map};
