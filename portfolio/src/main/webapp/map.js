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

import {Location} from './location.js';

/**
 * This class is used to create a map to display in the Places tab.
 */
class Map {
  constructor() {
    // Zoom level for the map.
    this.ZOOM = 16;
    // Map that contains Location objects representing each marker.
    this.LOCATIONS = {
      duke : new Location(
        {lat: 36.001111, lng: -78.938889},
        'Duke University',
        `This is the center of Duke University, founded in 1838.
        Im currently a sophomore there studying computer science.`),

      wilson : new Location(
        {lat: 35.9974, lng: -78.9414},
        'Wilson Recreation Center',
        `This is Wilson Recreation Center, with a huge gym, several
        basketball courts, olympic-sized pools, a rock-climbing wall,
        and other cool features. I like going there to work out with
        my friends all the time.`),

      chapel : new Location(
        {lat: 36.0019, lng: -78.9403},
        'Duke Chapel',
        `This is Duke Chapel, one of the tallest university chapels in
        the world. It's architecture is Collegiate Gothic, many of Duke's
        academic buildings have this style of architecture. It's absolutely
        breathtaking.`),

      keohane : new Location(
        {lat: 35.9989, lng: -78.9373},
        'Keohane 4E',
        `This is Keohane 4E, my dorm sophomore year. It is in a great location
        far enough away from main quad without being too far to be
        incovenient to walk to class. It's also one of the nicest dorms on campus.`)
    };
  }
  
  /** Creates a map and adds it to the page. */
  createMap() {
    const map = new google.maps.Map(
      document.getElementById('map'),
      {center: this.LOCATIONS.duke.coords, zoom: this.ZOOM}
    );

    this.createMarker(this.LOCATIONS.duke.coords, map, this.LOCATIONS.duke.title,
      this.LOCATIONS.duke.description);

    this.createMarker(this.LOCATIONS.wilson.coords, map,
      this.LOCATIONS.wilson.title, this.LOCATIONS.wilson.description);

    this.createMarker(this.LOCATIONS.chapel.coords, map,
      this.LOCATIONS.chapel.title, this.LOCATIONS.chapel.description);

    this.createMarker(this.LOCATIONS.keohane.coords, map,
      this.LOCATIONS.keohane.title, this.LOCATIONS.keohane.description);
  }

  /** Adds a marker to the map.
   * @param {*} position - Lat,Lng object indicating global coordinates.
   * @param {*} map - Instance of a Google Map. 
   * @param {String} title - Title of the marker.
   * @param {String} description - String containing
   *   a description of each location.
   */
  createMarker(position, map, title, description) {
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title
    });
    this.createInfoWindow(marker, description);
  }

  /** 
   * Adds an info window to a marker and displays it only when clicked on.
   * @param {*} marker - Marker to create an info window on.
   * @param {String} description - Description to be added to info window content.
   * */
  createInfoWindow(marker, description) {
    const windowContentElement = document.createElement('p');
    windowContentElement.classList.add('info-window-description');
    windowContentElement.innerText = description;

    const infoWindow = new google.maps.InfoWindow({
      content: windowContentElement
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }
}

export {Map};
