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
class SlideShow {
  constructor () {
      /** @private @type {number} */
      this.slideIndex = 0;

      /** @private @type {number} */
      this.savedIndex = -1;
  }

  /** 
   * Changes the current slide in a slideshow 
   * by incrementing by the given n. 
   * @param {number} slideIncrement - The increment/decrement value for 
   *   showing the next slide.
   */
  showNextSlide(slideIncrement) {
    this.showSlide(this.slideIndex += slideIncrement);
  }

  /** 
   * Display the current nth slide. 
   * @param {number} current - The current nth index representing the current
   *   slide.
   */
  showCurrentSlide(current) {
    this.showSlide(this.slideIndex = current);
  }

  /** 
   * Event handler that takes care of which slide to display in the slideshow.
   * @param {number} slideToShow - The variable containing the index for 
   *   the current nth slide.
   */
  showSlide(slideToShow) {
    const slides = document.getElementsByClassName("slide");
    const slideDemos = document.getElementsByClassName("slide-demo");
    const caption = document.getElementById("caption");

    // Handles n-overflow when n is not in the range of the number 
    // of slides or when n is <1.

    if (slideToShow > slides.length - 1) {
      this.slideIndex = 0;
    }
    else if (slideToShow < 0) {
      this.slideIndex = slides.length - 1;
    }
  
    // Stop displaying the previous slide from savedIndex.
    // We only want to stop displaying a slide if the slide has already
    // been displayed or if the savedIndex is not the same as the new
    // slide index, i.e. if I click on the current slide again, I don't want
    // it to stop displaying. We don't want to re-render something already on 
    // screen.
    if (this.savedIndex > -1 && this.savedIndex != this.slideIndex){
      slides[this.savedIndex].classList.remove("default-block");
      slides[this.savedIndex].classList.add("default-none");
    }
  
    removeClassName("slide-demo", "slide-active");
    slides[this.slideIndex].classList.remove("default-none");
    slides[this.slideIndex].classList.add("default-block");
    slideDemos[this.slideIndex].classList.add("slide-active");
    caption.innerHTML = slideDemos[this.slideIndex].alt;
    this.savedIndex = this.slideIndex;
  }
}

export {SlideShow};