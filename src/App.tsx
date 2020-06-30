import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SentenceFinder from "./pages/SentenceFinder";
import ErrorBoundary from "./components/ErrorBoundary";
import { track } from "./utils/tracker";

export const TEST_ID = "app";

track("Page Viewed");

const App = () => (
  <Router>
    <div className="app" data-testid={TEST_ID}>
      <ErrorBoundary>
        <div className="appp__bg-overlay"></div>
        <Switch>
          <Route path="/">
            <SentenceFinder />
          </Route>
        </Switch>
      </ErrorBoundary>
    </div>
  </Router>
);

export default App;
