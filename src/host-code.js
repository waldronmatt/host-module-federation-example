import Heading from "./heading/heading.js";
import moduleFederation from "./mf-image/module-federation.js";
import jQueryTest from "./jquery-test";

const heading = new Heading();
heading.render("HOST (Module Federation)");

const image = new moduleFederation();
image.render();

import("FormApp/initForm").then((initFormModule) => {
  const initForm = initFormModule.default;
  initForm();
});

jQueryTest();
