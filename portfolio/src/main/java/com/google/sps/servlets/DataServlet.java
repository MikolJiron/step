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
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns comments and their associated data. */
@WebServlet("/comments-data")
public class DataServlet extends HttpServlet {

  private final ArrayList<String> comments = new ArrayList<String>();
  private final String COMMENT_PARAM = "commentText";
  private final String ENTITY_TYPE = "Comment";
  private final String TIMESTAMP_PARAM = "timestamp";

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get comment text and a timestamp for when that comment was received.
    String newComment = request.getParameter(COMMENT_PARAM);
    long timestamp = System.currentTimeMillis();

    // Create an Entity to store the comment.
    Entity commentEntity = new Entity(ENTITY_TYPE);
    commentEntity.setProperty(COMMENT_PARAM, newComment);
    commentEntity.setProperty(TIMESTAMP_PARAM, timestamp);
    
    // Store the Entity containing the comment.
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

    // Redirect back to the HTML page.
    response.sendRedirect("/index.html");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Convert the ArrayList<String> comments to JSON.
    String json = convertToJson(comments);

    // Send the list of comments as the response.
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  /**
   * Converts an ArrayList<String> to a json string.
   * @param message - ArrayList<String> that needs to be converted.
   * @return - Newly converted JSON string.
   */
  private String convertToJson(ArrayList<String> message) {
    Gson gson = new Gson();
    String json = gson.toJson(message);
    return json;
  }
}
