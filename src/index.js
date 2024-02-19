import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
// import * as ReactDOM from "react-dom/client";
import App from "./App";

export const root = ReactDOM.createRoot(document.getElementById("root"));

export const re_render = () => {
  root.render(
    // <ErrorBoundary>
    <App />

    // </ErrorBoundary>
  );
};
re_render();
// import React from "react";
// import { ReactDOM } from "react";
// import App from './App'
// ReactDOM.render(<App />, document.getElementById("root"));
