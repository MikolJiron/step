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

class Tab {
  constructor() {};

  /**  
   * Displays the default Section for my page: "background".
   */
  displayDefaultSection() {
    const tab = document.getElementById('default-tab');
    const background = document.getElementById('background');
    tab.classList.add('active');
    background.classList.remove('default-none');
    background.classList.add('default-block');
  }

  /**  
   * Displays certain Sections when a specific tab is 
   * selected.
   * @param event - The event that triggers the website to display
   *   section-content element.
   * @param {string} sectionName - This is the sectionName that is used 
   *   to determine which section to display. 
   */
  displaySection(event, sectionName) {
    const section = document.getElementById(sectionName);
    Utils.setToNone('section-content');
    Utils.removeClassName('section-tab', 'active');

    // Displays the appropriate content for the sectionName 
    // associated with the tab the user just clicked on.
    section.classList.remove('default-none'); 
    section.classList.add('default-block');

    // Changes the styling to active for the tab the user just clicked on.
    event.currentTarget.classList.add('active');
  }
}

export {Tab};
