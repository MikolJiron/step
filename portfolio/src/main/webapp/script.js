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

/* global variable that gives me which slide I'm currently on in the SlideShow. */
var slideIndex;

/* Performs necessary functions when page is first loaded. */
window.onload = function() {
    displayDefaultSection();
    slideIndex = 1;
    showSlide(slideIndex);
}

/* 
Sets the default-tab by "clicking" on the "Background" tab, 
which has id="default-tab.
*/
function displayDefaultSection() {
    document.getElementById("default-tab").click();
}

/* 
Displays certain Sections will when a specific tab is 
selected at the top". 
*/
function displaySection(event, sectionName) {
    setToNone("section-content");
    replaceClassName("section-tab", " active");
    // Displays the appropriate content for the sectionName 
    // associated with the tab the user just clicked on. 
    document.getElementById(sectionName).style.display = "block";

    // Changes the styling to active for the tab the user just clicked on.
    event.currentTarget.className += " active";
}

// Set all elements of given className name to style.display = none.
function setToNone(name) {
    var i, content;
    content = document.getElementsByClassName(name);
    for (i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
}

/*
Sets className of all elements of a given 
className name from "active" to default "".
*/
function replaceClassName(name, toRemove) {
    var i, elements;
    elements = document.getElementsByClassName(name);
    for (i = 0; i < elements.length; i++) {
        elements[i].className = elements[i].className.replace(toRemove, "");
    }
}

/* Changes the current slide in a slideshow by incrementing by the given n. */
function showNextSlide(n) {
    showSlide(slideIndex += n);
}

/* Display the current nth slide. */
function showCurrentSlide(n) {
    showSlide(slideIndex = n);
}

/* Event handler that takes care of which slide to display in the slideshow. */
function showSlide(n) {
    var slides = document.getElementsByClassName("slide");
    var slideDemos = document.getElementsByClassName("slide-demo");
    var caption = document.getElementById("caption")

    //Handles n-overflow when n is not in the range of the number 
    //of slides or when n is <1.

    if (n > slides.length) {
        slideIndex = 1;
    }

    else if (n < 1) {
        slideIndex = slides.length;
    }
    setToNone("slide");
    replaceClassName("slide-demo", " slide-active");

    slides[slideIndex - 1].style.display = "block"
    slideDemos[slideIndex - 1].className += " slide-active"
    caption.innerHTML = slideDemos[slideIndex - 1].alt;
}

