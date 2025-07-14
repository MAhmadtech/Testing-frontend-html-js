import React, { useState, useEffect } from 'react';
import logo from "../assets/images/logo.svg";
import googleLogo from "../assets/images/googleIcon.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from "@react-oauth/google";

const GoogleViewURL = process.env.REACT_APP_BACKEND_URL + "/api/api/google-auth";
const LoginViewURL = process.env.REACT_APP_BACKEND_URL + "/api/login";

const Login = ({ openTab, setOpenTab, setLoginCredentials, i18n, t, setCurrentLanguage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('en'); // default English
  

  let navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage('en'); // Always set to English when page loads
    localStorage.setItem('i18nextLng', 'en'); // Also update localStorage
  }, [i18n]);

  const handleLogin = async (ev) => {
    ev.preventDefault();
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const formData = { email, password };

    try {
      const res = await axios.post(LoginViewURL, formData);
      const data = res.data;
      if (data.success === true) {
        console.log(data.message);
        toast.success(data.message);
        setLoginCredentials(true);
        navigate("/analyse", { state: { id: data.id, first_name: data.first_name, email: data.email } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    try {
      const res = await axios.post(GoogleViewURL, { token });
      const data = res.data;
      if (data.success) {
        console.log(data);
        toast.success(data.message);
        setLoginCredentials(true);
        navigate("/analyse", { state: { id: data.data.id, first_name: data.data.first_name, email: data.data.email } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during Google login. Please try again.");
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCurrentLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('i18nextLng', selectedLanguage);
  };

  return (
    <div className="bg-white w-full h-full p-6 flex flex-col justify-center text-center md:w-10/12 lg:w-10/12">
     
      <div className="container mx-auto max-w-md">
        <button 
          onClick={() => navigate('/')} 
          className="mb-4 p-2 bg-transparent hover:bg-gray-200 text-gray-700 font-semibold hover:text-gray-800 rounded-lg border-2 border-gray-300 hover:border-gray-400"
        >
          {t("Back")}
        </button>
      </div>

      <ToastContainer />
      <div className="container mx-auto max-w-md">
        <img src={logo} alt="Logo" />
        <p className="text-[#035A53] text-left mb-6">{t("underLogoText")}</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="w-full">
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t("enterEmail")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 mb-2">{t("password")}</label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="●●●●●●●●"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-orange-500 cursor-pointer"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    {/* eye open */}
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    {/* eye closed */}
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              onClick={(e) => { e.preventDefault(); setOpenTab('forgotPassword'); }}
              href="#"
              className="text-[#FF765B] hover:underline"
            >
              {t("forgotPassword")}
            </a>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => { setOpenTab('signup'); }}
              className="w-full px-4 py-2 bg-[#fff] rounded-[100px] border border-[#FF765B] hover:bg-[#FF765B]"
            >
              {t("signup")}
            </button>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#fff] rounded-[100px] border border-[#FF765B] hover:bg-[#FF765B]"
            >
              {t("login")}
            </button>
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">{t("or")}</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="mb-4 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
              useOneTap
              theme="outline"
              className="google-login-btn w-full max-w-xs px-4 py-2 bg-[#fff] rounded-[100px] border border-[#FF765B] hover:bg-[#FF765B]"
              style={{ display: 'block', margin: '0 auto' }}
            />
          </div>

        </form>

        <p className="text-center text-gray-500 mt-4">
          {t("termsPrivacy1")} <span className="text-[#FF765B]">{t("termsPrivacy2")}</span>{t("termsPrivacy3")}
          <span className="text-[#FF765B]">{t("termsPrivacy4")}</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
