import Heading from "./heading/heading.js";
import moduleFederation from "./image/module-federation.js";
import jQueryTest from "./jquery-test/jquery-test";

const heading = new Heading();
heading.render("HOST (Module Federation)");

const image = new moduleFederation();
image.render();

import("FormApp/initContactForm").then((initContactFormModule) => {
  const initContactForm = initContactFormModule.default;
  initContactForm();
});

/*
  This import should be at the bottom
  We're intentially throwing an error to test the jQuery version
  The error will prevent other content from being rendered to the DOM
  if it is below this function call
*/
jQueryTest();
