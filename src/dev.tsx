import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import VisualEditor from "./VisualEditor";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <VisualEditor />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
