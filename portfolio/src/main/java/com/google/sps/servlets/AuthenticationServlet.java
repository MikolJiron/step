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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
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
    response.setContentType("application/json;");

    UserService userService = UserServiceFactory.getUserService();
    UserStatus status;

    if (userService.isUserLoggedIn()) {
      // The user IS logged in.
      // Create UserStatus object.
      String urlToRedirectToAfterUserLogsOut = "/";
      String logoutUrl = userService.createLogoutURL(urlToRedirectToAfterUserLogsOut);
      status = new UserStatus(true, logoutUrl);

    } else {
      // The user IS NOT logged in.
      // Create UserStatus object.
      String urlToRedirectToAfterUserLogsIn = "/";
      String loginUrl = userService.createLoginURL(urlToRedirectToAfterUserLogsIn);
      status = new UserStatus(false, loginUrl);
    }

    // Convert the status object to JSON.
    String json = convertToJson(status);

    // Send the login status as the JSON response.
    response.getWriter().println(json);
  }

  /**
   * Converts an List<Comment> to a json string.
   * @param listOfComments - List<Comment> that needs to be converted.
   * @return - Newly converted JSON string.
   */
  private String convertToJson(List<Comment> listOfComments) {
    Gson gson = new Gson();
    String json = gson.toJson(listOfComments);
    return json;
  }

}
