import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import EditorRouter from "./EditorRouter";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <EditorRouter />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
