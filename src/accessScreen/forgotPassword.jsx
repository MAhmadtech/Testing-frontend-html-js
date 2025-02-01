import React, { useState } from 'react';
import logo from "../assets/images/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL + "/api/forgotPassword";

const ForgotPassword = ({ setOpenTab, setOtpEmail, t }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await axios.post(URL, { email });
      const data = res.data;

      if (data.success) {
        toast.success(data.message);
        setOpenTab("otp");  // Only change tab if the request is successful
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.error(err);
    }
  };

  // Handle email change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setOtpEmail(value);  // Set email in the parent state

    if (!validateEmail(value)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  return (
    <div className="bg-white w-full h-full p-6 flex flex-col justify-center text-center md:w-10/12 lg:w-10/12">
      <div className="container mx-auto max-w-md">
        <img src={logo} alt="Logo" />
        <p className="text-[#035A53] mb-6 text-left">{t("underLogoText")}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="w-full">
            {/* Email Input */}
            <label className="text-[#035a53] text-base font-semibold leading-none font-['Poppins']">
              {t("enterEmailPrompt")}
            </label>
            <input
              onChange={handleEmailChange}  // Call the handler on change
              type="email"
              value={email}
              placeholder={t("enterEmail")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          <p className="text-[#3277df] ml-2 text-sm font-normal leading-tight tracking-tight font-['Proxima Nova']">
            {t("passwordResetLinkPrompt")}
          </p>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={!validateEmail(email)} // Disable button if email is invalid
              className={`w-full px-4 py-2 bg-[#fff] rounded-[100px] border border-[#FF765B] hover:bg-[#FF765B]`}
            >
              {t("send")}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
