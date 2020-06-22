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

/** Default zoom for my map. */
const DEFAULT_ZOOM = 16;

/**
 * This class is used to create a map to display in the Places tab.
 */
class Map {
  constructor() {
    this.LOCATIONS = [
      new Location({lat: 36.001111, lng: -78.938889}, 'Duke University'),
      new Location({lat: 35.9974, lng: -78.9414}, 'Wilson Recreation Center'),
      new Location({lat: 36.0019, lng: -78.9403}, 'Duke Chapel')
    ];
  }
  
  /** Creates a map and adds it to the page. */
  createMap() {
    const map = new google.maps.Map(
      document.getElementById('map'),
      {center: this.LOCATIONS[0].coords, zoom: DEFAULT_ZOOM}
    );

    this.LOCATIONS.forEach((entry) => {
      this.createMarker(entry.coords, map, entry.title);
    });
    
  }

  /** Adds a marker to the map.
   * @param {*} position - Lat,Lng object indicating global coordinates.
   * @param {*} map - Instance of a Google Map. 
   * @param {String} title - Title of the marker.
   */
  createMarker(position, map, title) {
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title
    });
  }
}

export {Map};
