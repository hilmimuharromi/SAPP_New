import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import "@ant-design/compatible/assets/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// window.renderhttpsmisal1beacukaigoid = (containerId, props) => {
//   ReactDOM.render(<App {...props} />, document.getElementById(containerId));
//   serviceWorker.unregister();
// };

// window.unmounthttpsmisal1beacukaigoid = (containerId) => {
//   return ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
// };

// if (!document.getElementById("MainContent-container"))
//   ReactDOM.render(<App />, document.getElementById("root"));

// serviceWorker.unregister();
