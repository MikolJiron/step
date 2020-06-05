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
   * to add the message to the specified element in the DOM.
   * @param {string} elementToPopulate - The id of the element I want to fill 
   *   with the message I received. 
   * @param {string} URLToRetrieveFrom - The URL to fetch the message from.
   */
  static getMessageRequest(elementToPopulate, URLToRetrieveFrom) {
    fetch(URLToRetrieveFrom).then(response => response.text()).then((message) => {
      document.getElementById(elementToPopulate).innerText = `Received Message:  ${message}`;
    });
  }

  /**
   * Fetches a list of messages from a URL via the Java servlet, uses a promise 
   * to add them to the DOM once the message has been received.
   * @param {String} elementToPopulate - The id of the element I want to fill
   *   with the messages I received. 
   * @param {String} URLToRetrieveFrom - The URL to fetch the message from.
   */
  static getMessageListRequest(elementToPopulate, URLToRetrieveFrom ) {
    fetch('/data').then(response => response.json()).then((messages) => {
      // messages is an object, not a string, so we have to
      // reference its fields to create HTML content.
      const messagesListElement = document.getElementById(elementToPopulate);
      messagesListElement.innerHTML = '';

      // Add each message in the JSON messages to the DOM.
      messages.forEach((message) => {
        messagesListElement.appendChild(
          this.createListElement(message)
        );
      });
    });
  }

  /** 
   * Creates an <li> element containing text. 
   * @param {string} text - Text to put into a list element.
   * @returns {*} liElement - Newly created <li> element.
   */
  static createListElement(text) {
    const liElement = document.createElement('li');
    liElement.innerText = text;
    return liElement;
  }
}

export {Comments};