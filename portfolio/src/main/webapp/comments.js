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
 * Represents a Comments object whose getComments() method retrieves comments data from
 * the Java servlet and populates the data into a container in the DOM. 
 */
class Comments {
  constructor() {
    this.commentsListContainer = document.getElementById('comments-container');
    this.endpointToRetrieveDataFrom = '/comments-data';
  }

  /**
   * Fetches a list of comments from a URL via the Java servlet, uses a promise 
   * to add them to the DOM once the comments have been received.
   */
  getComments() {
    fetch(this.endpointToRetrieveDataFrom)
      .then(this.checkFetchError)
      .then((commentsList) => {
        // Reset the commentsListContainer to reload it with the new list of comments.
        this.commentsListContainer.innerHTML = '';

        // Add each comment in the JSON to the DOM.
        commentsList.forEach((comment) => {
          this.commentsListContainer.appendChild(
            this.createCommentElement(comment)
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /** 
   * Creates an <li> element containing a comment. 
   * @param {string} text - Text to put into a list element.
   * @return {*} - Newly created <li> element containing the comment's text.
   */
  createCommentElement(text) {
    const commentElement = document.createElement('li');
    commentElement.innerText = text;
    return commentElement;
  }

  /**
   * Returns an error if the response status is not between 200 and 299, i.e not OK.
   * @param {*} response - The HTTP response received from the servlet.
   * @return {*} - If an error is not thrown, returns the json response.
   */
  checkFetchError(response) {
    if (response.ok()) {
      return response.json();
    } else {
      throw Error(`${response.statusText}. Status: ${response.status}`);
    }
  }
}

export {Comments};