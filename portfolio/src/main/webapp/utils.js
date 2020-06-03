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
 * Set all elements of given classToModify to style.display = none.
 * @param {string} classToModify - The name of the class that I need to modify.
 */
const setToNone = (classToModify) => {
  const content = document.getElementsByClassName(classToModify);
  for (let i = 0; i < content.length; i++) {
    content[i].classList.remove("default-block");
    content[i].classList.add("default-none");
  }
}

/**
 * Remove class B (toRemove) from elements of class A (classToModify)
 * @param {string} classToModify - The name of the class of elements I need to 
 *   modify.
 * @param {string} classToRemove - The name of the class I'm removing from 
 *   elements with class = classToModify
 */
const removeClassName = (classToModify, classToRemove) => {
  const elements = document.getElementsByClassName(classToModify);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(classToRemove);
  }
}

export {removeClassName, setToNone};