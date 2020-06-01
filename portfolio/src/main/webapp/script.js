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
  document.getElementById("default-tab").click();
}

/**  
 * Displays certain Sections will when a specific tab is 
 * selected at the top". 
 * @param {event} arg The event that triggers the website to display
 *  section-content element.
 * @param {sectionName} arg This is the sectionName that is used 
 *  to determine which section to display. 
 */
displaySection = (event, sectionName) => {
  setToNone("section-content");
  replaceClassName("section-tab", "active");
  // Displays the appropriate content for the sectionName 
  // associated with the tab the user just clicked on. 
  document.getElementById(sectionName).style.display = "block";
  // Changes the styling to active for the tab the user just clicked on.
  event.currentTarget.classList.add("active");
}

/** 
 * Set all elements of given className name to style.display = none.
 * @param {name} arg The name of the class that I need to modify.
 */
setToNone = (name) => {
  const content = document.getElementsByClassName(name);
  for (let i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
  // Using forEach made the sections no longer display even when 
  // I clicked on a tab 

  /* content.forEach((element) => {
    element.style.display = "none";
  }) */
}

/**
 * Sets className of all elements of a given 
 * className name from "active" to default "".
 * @param {name} arg The name of the class I need to modify.
 * @param {toRemove} arg The string that I need to remove 
 *  from the class name I'm modifying.
 */
replaceClassName = (name, toRemove) => {
  const elements = document.getElementsByClassName(name);
  for (let i = 0; i < elements.length; i++) {
    // elements[i].className = elements[i].className.replace(toRemove, "");
    elements[i].classList.remove(toRemove);
  }
  // Using forEach made the sections no longer display even when 
  // I clicked on a tab

  /* elements.forEach((element) => {
    element.className = element.className.replace(toRemove, "");
  }) */
}

/** 
 * Changes the current slide in a slideshow 
 * by incrementing by the given n. 
 * @param {n} arg The increment/decrement value for showing the next slide.
 */
showNextSlide = (n) => {
  showSlide(slideIndex += n);
}

/** 
 * Display the current nth slide. 
 * @param {n} arg The current nth index representing the current slide
 */
showCurrentSlide = (n) => {
  showSlide(slideIndex = n);
}

/** 
 * Event handler that takes care of which slide to display in the slideshow.
 * @param {n} arg The variable containing the index for the current nth slide.
 */
showSlide = (n) => {
  const slides = document.getElementsByClassName("slide");
  const slideDemos = document.getElementsByClassName("slide-demo");
  const caption = document.getElementById("caption");

  // Handles n-overflow when n is not in the range of the number 
  // of slides or when n is <1.

  if (n > slides.length) {
    slideIndex = 1;
  }
    
  else if (n < 1) {
    slideIndex = slides.length;
  }
  setToNone("slide");
  replaceClassName("slide-demo", "slide-active");

  slides[slideIndex - 1].style.display = "block";
  slideDemos[slideIndex -1].classList.add("slide-active");
  caption.innerHTML = slideDemos[slideIndex - 1].alt;
}

