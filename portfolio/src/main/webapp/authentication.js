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

import {Comments} from './comments.js';

/**
 * This class handles User Authentication.
 */
class Authentication {  
  constructor() {
    this.loginLogoutButton = document.getElementById('login-logout-button');
    this.loginLogoutStatusMessage = document.getElementById('status-message');
  }
  
  /**
   * Retrieves login status and associated URL.
   */
  getLoginStatus() {
    fetch('/authenticate-user')
      .then(this.checkFetchError)
      .then((loginStatus) => {
        // Always create a login-logout-button regardless of loginStatus.
        this.createLoginLogoutButton(loginStatus.isLoggedIn, loginStatus.loginLogoutURL);
      })
      .catch((error) => {
        console.log(`${error}. Failed to fetch login status of the user.`);
      });
  }

  /**
   * Create login-logout button inside the commentsListContainer depending 
   *   on whether the user is logged in or not.
   * @param {boolean} isLoggedIn - Is the user logged in? Yes or No?
   * @param {string} loginLogoutURL - The URL the user will be
   *   redirected once they click on the button.
   */
  createLoginLogoutButton(isLoggedIn, loginLogoutURL) {
    const commentsListContainer = document.getElementById('comments-container');
    const link = document.createElement("a");
    link.href = loginLogoutURL;
    if (isLoggedIn) {
      link.innerText = 'Log out';
      this.loginLogoutStatusMessage.innerText = 'Welcome! You are logged in!';
      commentsListContainer.classList.toggle('default-none', /** addClass= */ false);
    } else {
      link.innerText = 'Log in';
      this.loginLogoutStatusMessage.innerText = 'Access Denied. Please log in!';
      commentsListContainer.classList.toggle('default-none', /** addClass= */ true);
    }
    this.loginLogoutButton.appendChild(link);
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

export {Authentication};