import * as React from "react";
import { render } from "react-dom";
import "typeface-roboto";
import App from "./components/App";
import { initialize, presence } from "./FirebaseHelpers";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import "./tinker";

initialize();
presence();

render(<App />, document.getElementById("root") as HTMLElement);

registerServiceWorker();
