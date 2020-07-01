import React from 'react';
import './App.css';
import Search from './search/Search';
import 'semantic-ui-css/semantic.min.css'
import Results from './results/Results';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SoldPriceArea from './visuals/SoldPriceArea';
import SoldPriceDetails from './visuals/SoldPriceDetails';
import ResultTable from './results/ResultTable';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/results/:terms" component={Results}/>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
        {/* <ResultTable /> */}
      </div>
    </Router>
  );
}

export default App;
