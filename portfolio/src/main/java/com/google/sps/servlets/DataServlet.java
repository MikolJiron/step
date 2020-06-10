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
import com.google.sps.data.Params;
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

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get comment text and a timestamp for when that comment was received.
    String newComment = request.getParameter(Params.COMMENT_TEXT_PARAM);
    long timestamp = System.currentTimeMillis();

    // Create an Entity to store the comment.
    Entity commentEntity = new Entity(Params.ENTITY_TYPE);
    commentEntity.setProperty(Params.COMMENT_TEXT_PARAM, newComment);
    commentEntity.setProperty(Params.TIMESTAMP_PARAM, timestamp);

    // Store the Entity containing the comment.
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

    // Redirect back to the HTML page.
    response.sendRedirect(Params.INDEX_PATH);
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Create a new query that sorts the comments by giving the most recent Comment at the top.
    Query query = new Query(Params.ENTITY_TYPE).addSort(Params.TIMESTAMP_PARAM, SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    // Create the list of comments.
    List<Comment> commentsList = new ArrayList<>();

    // Add each comment into the commentsList.
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String commentText = (String) entity.getProperty(Params.COMMENT_TEXT_PARAM);
      long timestamp = (long) entity.getProperty(Params.TIMESTAMP_PARAM);

      Comment comment = new Comment(id, commentText, timestamp);
      commentsList.add(comment);
    }

    // Limit the number of comments.
    int commentLimit = getNumberComments(request);

    // An invalid input will result in an error, so we let the user know.
    if (commentLimit == -1) {
      response.setContentType(Params.HTML_CONTENT_TYPE);
      response.sendError(400);
      response.getWriter().println("Please enter an integer between 1 and 20.");
      return;
    }

    // We send the entire commentsList by default if commentLimit >= commentsList.size().
    List<Comment> commentsListToSend = commentsList;

    // Otherwise, we apply the commentLimit and only send a subList of comments.
    if (commentLimit < commentsList.size()) {
        commentsListToSend = commentsList.subList(0, commentLimit);
    }

    // Convert the commentsListToSend to JSON.
    String json = convertToJson(commentsListToSend);

    // Send the list of comments as the response.
    response.setContentType(Params.JSON_CONTENT_TYPE);
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

  /** 
   * Returns the number of comments to display, we want 20 max.
   * @param request - the HTTPServletRequest we received from the client.
   * @return - the number of comment to send back to the client. 
   */
  private int getNumberComments(HttpServletRequest request) {
    // Get the input from the form.
    String commentNumberString = request.getParameter(Params.COMMENT_NUMBER_PARAM);

    // Convert the input to an int.
    int commentNumber = -1;
    try {
      commentNumber = Integer.parseInt(commentNumberString);
    } catch (NumberFormatException e) {
      System.err.println("Could not convert to int: " + commentNumberString);
      return -1;
    }

    // Check that the input is between 1 and 20.
    if (commentNumber < 1 || commentNumber > 20) {
      System.err.println("Comment number is out of range: " + commentNumberString);
      return -1;
    }

    return commentNumber;
  }
}
