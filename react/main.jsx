import React, { createElement } from "react";
import { createRoot } from "react-dom/client";

// Load the app and show a readable message if the browser cannot load it.
import("./App.jsx").then(({ default: App }) => {
  createRoot(document.getElementById("root")).render(createElement(App));
}).catch((error) => {
  document.getElementById("root").innerHTML = `<main style="padding:40px;font-family:Arial"><h1>MoveDaily could not load</h1><p>${error.message}</p><p>Restart the Vite server and refresh this page.</p></main>`;
});
