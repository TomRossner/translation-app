import React from "react";

//Components
import Home from "./components/Home";
import Footer from "./components/Footer";

// Styles
import "./styles/main-styles.scss";
import "./styles/home-styles.scss";
import "./styles/footer-styles.scss";

const App = () => {
  return (
    <div className="main-container">
      <Home/>
      <Footer/>
    </div>
  )
}

export default App;