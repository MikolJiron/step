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

class Comments {
  constructor() {};

  /**
   * Fetches a message from a URL via the Java servlet, uses a promise  
   * to add the message to the specified element in index.html.
   * @param {string} elementToPopulate - The id of th element I want to fill 
   *   with the message I received. 
   * @param {string} URLToRetrieveFrom - The URL to fetch the message from.
   */
  static getMessageRequest(elementToPopulate, URLToRetrieveFrom) {
    fetch(URLToRetrieveFrom).then(response => response.text()).then((message) => {
      document.getElementById(elementToPopulate).innerText = `Received Message:  ${message}`;
    });
  }
}

export {Comments};