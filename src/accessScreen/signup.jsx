import React, { useState } from 'react';
import logo from "../assets/images/logo.svg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL + "/api/register";

const SignUp = ({ openTab, setOpenTab, t }) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (ev) => {
    ev.preventDefault();
    setPasswordError("");

    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const confirmpassword = ev.target.confirmpassword.value;

    if (password !== confirmpassword) {
      setPasswordError("Passwords do not match.");
      toast.error("Error: Passwords do not match.");
    } else {
      const formData = { email: email, password: password };
      try {
        await axios.post(URL, formData);
        toast.success("Registration successful!");

        setTimeout(() => setOpenTab('login'), 2000); // 2 seconds delay
      } catch (err) {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white w-full h-full p-6 flex flex-col justify-center text-center md:w-10/12 lg:w-10/12">
      <ToastContainer />
      <div className="container mx-auto max-w-md">
        <img src={logo} alt="Logo" />
        <p className="text-[#035A53] text-left mb-6">{t("underLogoText")}</p>

        <form className="space-y-4" action="POST" onSubmit={handleRegister}>
          <div className="w-full">
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t("enterEmail")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 mb-2">{t("password")}</label>
            <div className="relative w-full">
              <input
                type={showPassword1 ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="●●●●●●●●"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <span
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute right-3 top-2 text-orange-500 cursor-pointer"
              >
                {showPassword1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    {/* SVG paths for eye-open */}
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    {/* SVG paths for eye-closed */}
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-left text-gray-700 mb-2">{t("confirmPassword")}</label>
            <div className="relative w-full">
              <input
                type={showPassword2 ? 'text' : 'password'}
                name="confirmpassword"
                id="confirmpassword"
                placeholder="●●●●●●●●"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <span
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-3 top-2 text-orange-500 cursor-pointer"
              >
                {showPassword2 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    {/* SVG paths for eye-open */}
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    {/* SVG paths for eye-closed */}
                  </svg>
                )}
              </span>
            </div>
            {passwordError && <p className="text-[#FF765B] mt-1">{passwordError}</p>}
          </div>

          <div className="flex justify-center">
            <a onClick={(e) => { e.preventDefault(); setOpenTab('forgotPassword') }} href="/forgot" className="text-[#FF765B] hover:underline">{t("forgotPassword")}</a>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#fff] rounded-[100px] border border-[#FF765B] hover:bg-[#FF765B]"
            >
              {t("signup")}
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setOpenTab('login'); }}
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
        </form>

        <p className="text-center text-gray-500 mt-4">
          {t("termsPrivacy1")} <span className="text-[#FF765B]">{t("termsPrivacy2")}</span>{t("termsPrivacy3")}<span className="text-[#FF765B]">{t("termsPrivacy4")}</span>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
