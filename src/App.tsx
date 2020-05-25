import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import SentenceFinder from './pages/SentenceFinder';
import ErrorBoundary from './components/ErrorBoundary';

ReactGA.initialize('UA-33174971-5');
ReactGA.pageview(window.location.pathname + window.location.search);

export const TEST_ID = 'app';

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
