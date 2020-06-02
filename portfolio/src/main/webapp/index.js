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
import {displayDefaultSection, displaySection} from "./tab.js";
import {showCurrentSlide, showNextSlide, showSlide, slideIndex} from "./slideshow.js";

/** Allow all imported functions to be in the scope of "window". */
window.onload = () => {
  window.displaySection = displaySection;
  window.displayDefaultSection = displayDefaultSection;
  window.showNextSlide = showNextSlide;
  window.showSlide = showSlide;
  window.showCurrentSlide = showCurrentSlide;
  window.slideIndex = slideIndex;
  
  //set up the default section and correct slide to show.
  displayDefaultSection();
  setToNone("slide");
  showSlide(slideIndex);
}