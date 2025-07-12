import React from 'react';
import '../assets/css/LandingPage.css';
import Logo from '../assets/images/Logo.png';
import Language from '../assets/images/Language.svg';
import ArrowDown from '../assets/images/Arrow down.svg';
import MainMobile from '../assets/images/first_landing_page.png';
import FrontMobile from '../assets/images/second_landing_page.png';


function App() {
  return (
    <div className="main-screen">
      <img className="logo" src={Logo} alt="Logo" />

      <div className="text-container">
        <div className="tagline">
          This app helps you unmask manipulation. Copy paste your text and we'll
          get the tea ready.
        </div>
        <button id="signin">SIGN IN</button>
        <button id="register">REGISTER</button>
      </div>
      
      <div className="phone-container">
        <img id="MainMobile" src={MainMobile} alt="Mobile App" />
        <img id="FrontMobile" src={FrontMobile} alt="Mobile Screen" />
      </div>

      <div className="language-selector">
        <div className="language-icon">
          <img src={Language} alt="Language" />
        </div>
        <div className="language-text">English</div>
        <div className="arrow-icon">
          <img src={ArrowDown} alt="Dropdown" />
        </div>
      </div>
    </div>
  );
}

export default App;