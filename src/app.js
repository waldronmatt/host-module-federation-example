import Heading from "./heading/heading.js";
import moduleFederation from "./image/module-federation.js";
import jQueryTest from "./jquery-test/jquery-test";

const heading = new Heading();
heading.render("HOST (Module Federation)");

const image = new moduleFederation();
image.render();

jQueryTest();

import("FormApp/initContactForm").then((initContactFormModule) => {
  const initContactForm = initContactFormModule.default;
  initContactForm();
});
