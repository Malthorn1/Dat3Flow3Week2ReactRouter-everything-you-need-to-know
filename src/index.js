import bookFacade from "./bookFacade";
import React from 'react';
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom";

const AppWithRouter = () => {
  return (
    <Router>
      <App bookFacade={bookFacade} />
    </Router>
  );
};
ReactDOM.render(<AppWithRouter />, document.getElementById("root"));