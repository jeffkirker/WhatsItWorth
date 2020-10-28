import React from "react";
import "./App.css";
import Search from "./components/search/Search";
import "semantic-ui-css/semantic.min.css";
import Results from "./components/results/Results";
import AboutPage from "./components/aboutPage/AboutPage";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    // <AdvancedSearch />
    <Router>
      <div className="App">
        <Switch>
          <Route path="/results/:terms" component={Results} />
          <Route path="/about" component={AboutPage} />
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
