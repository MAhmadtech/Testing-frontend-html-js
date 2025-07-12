import React, { useState, useEffect } from 'react';
import '../assets/css/LandingPage.css';
import Logo from '../assets/images/Logo.png';
import Language from '../assets/images/Language.svg';
import ArrowDown from '../assets/images/Arrow down.svg';
import MainMobile from '../assets/images/first_landing_page.png';
import FrontMobile from '../assets/images/second_landing_page.png';
import  {Link} from 'react-router-dom';

const translations = {
  en: {
    tagline: "This app helps you unmask manipulation. Copy paste your text and we'll get the tea ready.",
    signIn: "SIGN IN",
    register: "REGISTER NOW"
  },
  fr: {
    tagline: "Cette application vous aide à démasquer la manipulation. Copiez-collez votre texte et nous préparerons le thé.",
    signIn: "SE CONNECTER",
    register: "S'INSCRIRE MAINTENANT"
  }
};

function App({ currentLanguage, setCurrentLanguage }) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'en');

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCurrentLanguage(lang);
  };

  const t = translations[selectedLanguage];

  return (
    <div className="main-screen">
      <img className="logo" src={Logo} alt="Logo" />

      <div className="text-container">
        <div className="tagline">
          {t.tagline}
        </div>
        <Link to="/login"><button id="signin">{t.signIn}</button></Link>
        <Link to="/signup"><button id="register">{t.register}</button></Link>
      </div>
      
      <div className="phone-container">
        <img id="MainMobile" src={MainMobile} alt="Mobile App" />
        <img id="FrontMobile" src={FrontMobile} alt="Mobile Screen" />
      </div>

      <div className="language-selector">
        <div className="language-icon">
          <img src={Language} alt="Language" />
        </div>
        <select 
          id="language-select" 
          className="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
        <div className="arrow-icon">
          <img src={ArrowDown} alt="Dropdown" />
        </div>
      </div>
    </div>
  );
}

export default App;