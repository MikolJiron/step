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

package com.google.sps.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.sps.data.AuthState;
import com.google.sps.data.Params;
import com.google.sps.data.UserStatus;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that sends authentication status and associated login/logout links to the client.*/
@WebServlet("/authenticate-user")
public class AuthenticationServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType(Params.JSON_CONTENT_TYPE);
    UserService userService = UserServiceFactory.getUserService();
    UserStatus status;
    // Create UserStatus based on whether the user is logged in or not.
    if (userService.isUserLoggedIn()) {
      // The user IS logged in.
      String logoutUrl = userService.createLogoutURL(Params.BASE_URL_PATH);
      status = new UserStatus(UserStatus.AuthState.LOGGED_IN.getState(), logoutUrl);
    } else {
      // The user IS NOT logged in.
      String loginUrl = userService.createLoginURL(Params.BASE_URL_PATH);
      status = new UserStatus(UserStatus.AuthState.LOGGED_OUT.getState(), loginUrl);
    }

    // Convert the status object to JSON and send the response.
    String json = convertToJson(status);
    response.getWriter().println(json);
  }

  /**
   * Converts an UserStatus to a json string.
   * @param status - UserStatus that needs to be converted.
   * @return - Newly converted JSON string.
   */
  private String convertToJson(UserStatus status) {
    Gson gson = new Gson();
    String json = gson.toJson(status);
    return json;
  }
}
