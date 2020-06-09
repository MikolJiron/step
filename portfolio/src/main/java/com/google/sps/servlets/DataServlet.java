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

  // TODO: Persist comments using DataStore and noSQL. Issue: DataStore.
  private final ArrayList<String> comments = new ArrayList<String>();
  private final String COMMENT_PARAM = "commentText";
  private final String HTML_PAGE_TO_REDIRECT_TO = "/index.html";
  private final String JSON_CONTENT_TYPE = "application/json;";

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Add new comment to my ArrayList of comments.
    String newComment = request.getParameter(COMMENT_PARAM);
    comments.add(newComment);

    // Redirect back to the HTML page.
    response.sendRedirect(HTML_PAGE_TO_REDIRECT_TO);
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Convert the ArrayList<String> comments to JSON.
    String json = convertToJson(comments);

    // Send the list of comments as the response.
    response.setContentType(JSON_CONTENT_TYPE);
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
