import "../stylesheets/index.css";
import "../stylesheets/App.css";

import React, { Component } from "react";
import SearchContainer from "./containers/search-container";
import ResultsContainer from "./containers/results-container";
import Header from "./components/header";
import Footer from "./components/footer";

class App extends Component {
  render() {
    return (
      <div className="SameMovie">
        <Header />
        <div className="SameMovie-content">
          <SearchContainer />
          <ResultsContainer />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
