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
 * Set all elements of given className name to style.display = none.
 * @param {string} name - The name of the class that I need to modify.
 */
const setToNone = (name) => {
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
const removeClassName = (name, toRemove) => {
  const elements = document.getElementsByClassName(name);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(toRemove);
  }
}

export {removeClassName, setToNone};