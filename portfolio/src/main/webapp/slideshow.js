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

import {removeClassName} from "./utils.js";

/** 
 * Global variables that gives me which 
 * slide I'm currently on in the SlideShow and which one I was in previously.
 */
let slideIndex = 1;
let savedIndex = 0;

/** 
 * Changes the current slide in a slideshow 
 * by incrementing by the given n. 
 * @param {number} slideIncrement - The increment/decrement value for 
 *   showing the next slide.
 */
const showNextSlide = (slideIncrement) => {
  showSlide(slideIndex += slideIncrement);
}

/** 
 * Display the current nth slide. 
 * @param {number} current - The current nth index representing the current slide.
 */
const showCurrentSlide = (current) => {
  showSlide(slideIndex = current);
}

/** 
 * Event handler that takes care of which slide to display in the slideshow.
 * @param {number} slideToShow - The variable containing the index for 
 *   the current nth slide.
 */
const showSlide = (slideToShow) => {
  const slides = document.getElementsByClassName("slide");
  const slideDemos = document.getElementsByClassName("slide-demo");
  const caption = document.getElementById("caption");

  // Handles n-overflow when n is not in the range of the number 
  // of slides or when n is <1.

  if (slideToShow > slides.length) {
    slideIndex = 1;
  }
  else if (slideToShow < 1) {
    slideIndex = slides.length;
  }
  
  // Stop displaying the previous slide from savedIndex
  // We only want to stop displaying a slide if the slide has already
  // been displayed or if the savedIndex is not the same as the new
  // slide index, i.e. if I click on the current slide again, I don't want
  // it to stop displaying. We don't want to re-render something already on screen.
  
  if (savedIndex > 0 && savedIndex != slideIndex){
    slides[savedIndex - 1].classList.remove("default-block");
    slides[savedIndex - 1].classList.add("default-none");
  }
  
  removeClassName("slide-demo", "slide-active");
  slides[slideIndex - 1].classList.remove("default-none");
  slides[slideIndex - 1].classList.add("default-block");
  slideDemos[slideIndex - 1].classList.add("slide-active");
  caption.innerHTML = slideDemos[slideIndex - 1].alt;
  savedIndex = slideIndex;
}

export {showCurrentSlide, showNextSlide, showSlide, slideIndex};