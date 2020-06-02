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

import {setToNone} from "./utils.js";
import Tab from "./tab.js";
import SlideShow from "./slideshow.js";

window.onload = () => {
  // Allow all imported functions to be in the scope of "window".
  window.tab = new Tab();
  window.slideShow = new SlideShow();
  
  // Set up default tab and slideshow.
  tab.displayDefaultSection();
  setToNone("slide");
  slideShow.showSlide(slideShow.slideIndex);
}
