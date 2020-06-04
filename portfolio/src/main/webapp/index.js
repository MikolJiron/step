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

"use strict";
import {Comments} from "./comments.js";
import {SlideShow} from "./slideshow.js";
import {Tab} from "./tab.js";
import {Utils} from "./utils.js";

const tab = new Tab();
const slideShow = new SlideShow();

window.onload = function() {
  // Allow all imported functions to be in the scope of "window" in 
  // window.onload.
  window.tab = tab;
  window.slideShow = slideShow;

  //Fetch my "hello" message from /data servlet after my window loads
  Comments.getMessageRequest();

  // Set up default tab and slideshow.
  window.tab.displayDefaultSection();
  Utils.setToNone("slide");
  window.slideShow.showSlide(window.slideShow.currentSlideIndex_);
}

// /**
//  * Fetches a message from the /data URL via the Java servlet, uses a promise to * add the message to the "hello-msg-container" in index.html
//  */
// function getMessageRequest() {
//   fetch('/data').then(response => response.text()).then((message) => {
//     document.getElementById('hello-msg-container').innerText = message;
//   });
// }