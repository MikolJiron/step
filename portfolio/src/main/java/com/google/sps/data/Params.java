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

package com.google.sps.data;

/** Holder for parameter and URL constants. */
public final class Params {
  public Params () {}

  // Parameter constants.
  public static final String COMMENT_NUMBER_PARAM = "commentNumber";
  public static final String COMMENT_TEXT_PARAM = "commentText";
  public static final String ENTITY_TYPE = "Comment";
  public static final String JSON_CONTENT_TYPE = "application/json;";
  public static final String HTML_CONTENT_TYPE = "text/html";
  public static final String TIMESTAMP_PARAM = "timestamp";
  public static final String USER_EMAIL_PARAM = "userEmail";

  // URL constants.
  public static final String BASE_URL_PATH = "/";
  public static final String INDEX_PATH = "/index.html";
  public static final String BASE_URL_PATH = "/";
}