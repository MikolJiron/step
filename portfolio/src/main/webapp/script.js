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

/** 
 * Global variable that gives me which 
 * slide I'm currently on in the SlideShow. 
 */
let slideIndex = 1;

/** Performs necessary functions when page is first loaded. */
window.onload = () => {
  displayDefaultSection();
  showSlide(slideIndex);
}

/**  
 * Sets the default-tab by "clicking" on the "Background" tab, 
 * which has id="default-tab.
 */
displayDefaultSection = () => {
  const tab = document.getElementById("default-tab");
  const background = document.getElementById("background");
  tab.classList.add("active");
  background.classList.remove("default-none");
  background.classList.add("default-block");
}

/**  
 * Displays certain Sections will when a specific tab is 
 * selected at the top". 
 * @param event - The event that triggers the website to display
 *  section-content element.
 * @param {string} sectionName - This is the sectionName that is used 
 *  to determine which section to display. 
 */
displaySection = (event, sectionName) => {
  const section = document.getElementById(sectionName);
  setToNone("section-content");
  replaceClassName("section-tab", "active");
  // Displays the appropriate content for the sectionName 
  // associated with the tab the user just clicked on.
  section.classList.remove("default-none"); 
  section.classList.add("default-block");
  // Changes the styling to active for the tab the user just clicked on.
  event.currentTarget.classList.add("active");
}

/** 
 * Set all elements of given className name to style.display = none.
 * @param {string} name - The name of the class that I need to modify.
 */
setToNone = (name) => {
  const content = document.getElementsByClassName(name);
  for (let i = 0; i < content.length; i++) {
    content[i].classList.remove("default-block");
    content[i].classList.add("default-none");
  }
}

/**
 * Sets className of all elements of a given 
 * className name from "active" to default "".
 * @param {string} name - The name of the class I need to modify.
 * @param {string} toRemove - The string that I need to remove 
 *  from the class name I'm modifying.
 */
replaceClassName = (name, toRemove) => {
  const elements = document.getElementsByClassName(name);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(toRemove);
  }
}

/** 
 * Changes the current slide in a slideshow 
 * by incrementing by the given n. 
 * @param {number} slideIncrement - The increment/decrement value for showing the next slide.
 */
showNextSlide = (slideIncrement) => {
  showSlide(slideIndex += slideIncrement);
}

/** 
 * Display the current nth slide. 
 * @param {number} current - The current nth index representing the current slide
 */
showCurrentSlide = (current) => {
  showSlide(slideIndex = current);
}

/** 
 * Event handler that takes care of which slide to display in the slideshow.
 * @param {number} slideToShow - The variable containing the index for the current nth slide.
 */
showSlide = (slideToShow) => {
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

  setToNone("slide");
  replaceClassName("slide-demo", "slide-active");

  slides[slideIndex - 1].classList.remove("default-none");
  slides[slideIndex - 1].classList.add("default-block");
  slideDemos[slideIndex - 1].classList.add("slide-active");
  caption.innerHTML = slideDemos[slideIndex - 1].alt;
}

