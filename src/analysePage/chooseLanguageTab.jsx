import React, { useState } from 'react';
import icon from "../assets/images/Icon.png"
import icon2 from "../assets/images/Icon2.png"
// import icon3 from "../assets/images/Icon3.png"
// import icon4 from "../assets/images/Icon4.png"
// import icon5 from "../assets/images/Icon5.png"
// import icon6 from "../assets/images/Icon6.png"
// import icon7 from "../assets/images/Icon7.png"




const CountryLanguageSelector = ({ t }) => {
  const countries = {
    USA: ['English', 'Spanish'],
    Canada: ['English', 'French'],
    India: ['Hindi', 'English'],
    Germany: ['German'],
    Australia: ['English'],
  };

  const countryList = [
    { name: 'USA', code: '+1', icon: { icon } },
    { name: 'Canada', code: '+1', icon: { icon2 } },
    { name: 'India', code: '+91', icon: './Icon3.png' },
    { name: 'Germany', code: '+49', icon: './Icon4.png' },
    { name: 'Australia', code: '+61', icon: './Icon6.png' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState([]);

  // Filter country list based on search input
  const filteredCountries = countryList.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
    setLanguages(countries[countryName] || []);
    setSelectedLanguage(''); // Reset language selection when country changes
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Selected Country: ${selectedCountry}, Selected Language: ${selectedLanguage}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white">
      {/* Search Country */}
      <div className="mb-4 relative ml-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
            />
          </svg>
        </div>
        <input
          type="search"
          className="w-[343px] h-[48px] border-b-2 pl-10"
          placeholder={t("selectYourCountry")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Country Dropdown */}
      {filteredCountries.length > 0 && (
        <ul>
          {filteredCountries.map((country) => (
            <li
              key={country.name}
              className="p-3 w-[273px] px-[50px] text-gray-700 text-base font-normal font-['Roboto'] leading-normal tracking-wide hover:bg-[#ff765b] hover:text-white relative"
              onClick={() => handleCountryChange(country.name)}
            >
              <img className="w-5 absolute" src={country.icon} alt="" />
              {country.name} ({country.code})
            </li>
          ))}
        </ul>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#fff] text-black py-2 border-2 rounded-lg hover:bg-[#ff765b] hover:text-white focus:outline-none focus:bg-[#ff765b]"
      >
        {t("submit")}
      </button>
    </div>
  );
};

export default CountryLanguageSelector;
