import React from "react";

//Components
import Home from "./components/Home";

// Styles
import "./styles/main-styles.scss";
import "./styles/home-styles.scss";

const App = () => {
  return (
    <div className="main-container">
      <Home/>
    </div>
  )
}

export default App;