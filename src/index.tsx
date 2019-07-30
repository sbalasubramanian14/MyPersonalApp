import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
