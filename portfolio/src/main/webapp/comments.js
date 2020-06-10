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
    this.commentsListContainer = document.getElementById("comments-container");
    this.loginLogoutButton = document.getElementById("login-logout-button");
    this.loginLogoutStatusMessage = document.getElementById("status-message");
    this.endpointToRetrieveDataFrom = "";
  }

  /**
   * Fetches a list of comments from a URL via the Java servlet, uses a promise 
   * to add them to the DOM once the comments have been received.
   * @param {number} commentsLimit - The number of comments I'm limiting the GET to.
   */
  getComments(commentsLimit) {
    // Set the endpoint URL and then add the comments limit to the endpoint.
    this.endpointToRetrieveDataFrom = `/comments-data?commentNumber=${commentsLimit}`;
    fetch(this.endpointToRetrieveDataFrom)
      .then(response => response.json())
      .then((commentsList) => {
        // Reset the commentsListContainer to reload it with the new list of comments.
        this.commentsListContainer.innerHTML = '';

        // Add each comment in the JSON to the DOM.
        commentsList.forEach((comment) => {
          this.commentsListContainer.appendChild(
            this.createCommentElement(comment.commentText)
          );
        });
      })
      .catch(() => {
        console.error("Failed to load comments.");
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
   * Deletes all comments in DataStore by doing a POST to /delete-comments-data.
   * Then, the comments are reloaded to confirm the database has been cleared.
   */
  deleteComments() {
    const request = new Request('/delete-comments-data', {method:'POST'})
    fetch(request)
    .then(this.getComments(10))
    .catch(() => {
      console.error("Failed to delete comments.");
    });
  }

  /**
   * Retrieves login status and associated URL.
   */
  getLoginStatus() {
    fetch('/authenticate-user')
    .then(this.checkFetchError)
    .then((loginStatus) => {
      // Show comments if you're logged in.
      if (loginStatus.isLoggedIn) {
        this.getComments(10);
      } 
      // Always create a login-logout-button regardless of loginStatus.
      this.createLoginLogoutButton(loginStatus.isLoggedIn, loginStatus.loginLogoutURL);
    });
  }

  /**
   * Create login-logout button depending on whether the user is logged in or not.
   * @param {boolean} isLoggedIn - Is the user logged in? Yes or No?
   * @param {string} loginLogoutURL - The URL the user will be
   *   redirected once they click on the button.
   */
  createLoginLogoutButton(isLoggedIn, loginLogoutURL) {
    if (isLoggedIn) {
      this.loginLogoutButton.innerHTML = `<a href=${loginLogoutURL}>Log Out</a>`;
      this.loginLogoutStatusMessage.innerText = 'Welcome! You are logged in!';
    } else {
      this.loginLogoutButton.innerHTML = `<a href=${loginLogoutURL}>Log In</a>`;
      this.loginLogoutStatusMessage.innerText = 'Access Denied. Please log in!';
    }
  }
  /**
   * Returns an error if the response status is not between 200 and 299, i.e not OK.
   * @param {*} response - The HTTP response received from the servlet.
   * @return {*} - If an error is not thrown, returns the json response.
   */
  checkFetchError(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(`${response.statusText}. Status: ${response.status}`);
    }
  }
}

export {Comments};