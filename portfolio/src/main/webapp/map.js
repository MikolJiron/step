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
    this.ZOOM = 16;
    this.MAP_COORDINATES = {
      duke : {lat: 36.001111, lng: -78.938889},
      wilson : {lat: 35.9974, lng: -78.9414},
      chapel : {lat: 36.0019, lng: -78.9403}
    };

    this.MAP_TITLES = {
      duke : 'Duke University',
      wilson : 'Wilson Recreation Center',
      chapel : 'Duke Chapel'
    };
  }
  
  /** Creates a map and adds it to the page. */
  createMap() {
    const map = new google.maps.Map(
      document.getElementById('map'),
      {center: this.MAP_COORDINATES.duke, zoom: this.ZOOM}
    );

    this.createMarker(this.MAP_COORDINATES.duke, map, this.MAP_TITLES.duke);
    this.createMarker(this.MAP_COORDINATES.wilson, map,
     this.MAP_TITLES.wilson);
    this.createMarker(this.MAP_COORDINATES.chapel, map, this.MAP_TITLES.chapel);
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
