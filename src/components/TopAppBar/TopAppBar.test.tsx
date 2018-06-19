import * as React from "react";
import * as ReactDOM from "react-dom";
import TopAppBar from "./";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TopAppBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
