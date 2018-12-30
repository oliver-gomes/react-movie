import React from "react";

import Header from "../elements/Header/Header";
import Home from "../Home/Home";

class App extends React.Component {
  render() {
    return (
      <div>
        <Home />
        <Header />
      </div>
    );
  }
}

export default App;
