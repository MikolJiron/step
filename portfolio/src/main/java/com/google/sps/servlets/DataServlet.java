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
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns comments and their associated data. */
@WebServlet("/comments-data")
public class DataServlet extends HttpServlet {

  private final String COMMENT_PARAM = "commentText";

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get comment text and a timestamp for when that comment was received.
    String newComment = request.getParameter(COMMENT_PARAM);
    long timestamp = System.currentTimeMillis();

    // Create an Entity to store the comment.
    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty(COMMENT_PARAM, newComment);
    commentEntity.setProperty("timestamp", timestamp);

    // Store the Entity containing the comment.
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

    // Redirect back to the HTML page.
    response.sendRedirect("/index.html");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Create a new query that sorts the comments by giving the most recent Comment at the top.
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    // Create the list of comments.
    List<Comment> commentsList = new ArrayList<>();

    // Add each comment into the commentsList.
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String commentText = (String) entity.getProperty(COMMENT_PARAM);
      long timestamp = (long) entity.getProperty("timestamp");

      Comment comment = new Comment(id, commentText, timestamp);
      commentsList.add(comment);
    }

    // Convert the commentsList to JSON.
    String json = convertToJson(commentsList);

    // Send the list of comments as the response.
    response.setContentType("application/json;");
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
