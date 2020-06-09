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

import {Utils} from './utils.js';

class SlideShow {
  constructor() {
    /**
      * @private @type {number} 
      */
    this.currentSlideIndex_ = 0;
  }

  /** 
   * If slideIncrement = True, move slideIndex to the right.
   * Else move slideIndex to the left and call showSlide().
   * @param {boolean} incrementDirection - The increment/decrement value for 
   *   showing the next slide.
   */
  showNextSlide(incrementDirection) {
    const newIndex = incrementDirection ? this.currentSlideIndex_ + 1 : this.currentSlideIndex_ - 1;
    this.showSlide(newIndex);
  }

  /** 
   * Event handler that takes care of which slide to display in the slideshow.
   * @param {number} slideToShow - The variable containing the index for 
   *   the current nth slide I need to show.
   */
  showSlide(slideToShow) {
    const slides = document.getElementsByClassName('slide');
    const slideDemos = document.getElementsByClassName('slide-demo');
    const caption = document.getElementById('caption');
    let newSlideIndex = slideToShow;
  
    // Handles index-out-of-bounds when newSlideIndex is not in the range of 
    // the number of slides or when newSlideIndex is < 1.
    if (newSlideIndex > slides.length - 1) {
      newSlideIndex = 0;
    } else if (newSlideIndex < 0) {
      newSlideIndex = slides.length - 1;
    }
  
    // Stop displaying the current slide only if the newSlideIndex is different
    // from currentSlideIndex_.
    if (newSlideIndex != this.currentSlideIndex_){
      slides[this.currentSlideIndex_].classList.remove('default-block');
      slides[this.currentSlideIndex_].classList.add('default-none');
      this.currentSlideIndex_ = newSlideIndex;
    }

    // Display the new slide.
    Utils.removeClassName('slide-demo', 'slide-active');
    slides[this.currentSlideIndex_].classList.remove('default-none');
    slides[this.currentSlideIndex_].classList.add('default-block');
    slideDemos[this.currentSlideIndex_].classList.add('slide-active');
    caption.innerHTML = slideDemos[this.currentSlideIndex_].alt;
  }
}

export {SlideShow};