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

/* This code script executes when the website is first loaded in  */

/* JavaScript "clicks" on the default tab so that content is shown when first going into the website */

/* Performs necessary functions when page is first loaded */
window.onload = function( ){
    displayDefaultSection();
}

/* Sets the default-tab by "clicking" on the "Background" tab, which has id="default-tab*/
function displayDefaultSection(){
    document.getElementById("default-tab").click();
}

/* Displays certain Sections will when a specific tab is selected at the top" */
function displaySection(event, sectionName){
    setContentToNone();
    setTabsToDefault();
    /* Displays the appropriate content for the sectionName associated with the tab the user just clicked on  */
    document.getElementById(sectionName).style.display = "block";

    /* Changes the styling to active for the tab the user just clicked on */
    event.currentTarget.className += " active";
}

/* Set all section-content elements to display = none*/
function setContentToNone(){
    var i, sectionContent;
    sectionContent = document.getElementsByClassName("section-content");

    for(i = 0; i < sectionContent.length; i++){
        sectionContent[i].style.display = "none";
    }
}

/* Set all section-tab elements from "active" to "" which changes to default styling for section-tab*/
function setTabsToDefault(){
    var i, sectionTabs;
    sectionTabs = document.getElementsByClassName("section-tab");
    for(i = 0; i < sectionTabs.length; i++){
        sectionTabs[i].className = sectionTabs[i].className.replace(" active", "");
    }
}


