/*
  We're loading the whole application with dynamic imports in this entry point.
  This gives webpack the time needed for the negotiation and loading the shared 
  libraries (jquery) when the application starts.
  https://www.angulararchitects.io/aktuelles/the-microfrontend-revolution-module-federation-in-webpack-5/
*/

import("./host-code");
