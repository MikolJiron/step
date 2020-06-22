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

/**
 * This class represents a location object for a marker on a map.
 */
class Location {
  /**
   * @param {object} coords - Object map containing lat and long coordinates.
   * @param {string} title - The title of the marker.
   */
  constructor(coords, title){
    this._coords = coords;
    this._title = title;
  }

  get coords() {
    return this._coords;
  }

  get title() {
    return this._title;
  }
}

export {Location};