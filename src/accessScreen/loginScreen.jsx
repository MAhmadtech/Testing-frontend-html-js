import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import illustration from "../assets/images/Illustration.jpg";
import illustrationGirl from "../assets/images/Illustrationgirl.jpg";
import OTP from '../accessScreen/otp';
import SignUp from '../accessScreen/signup';
import Login from '../accessScreen/login';
import ForgotPassword from '../accessScreen/forgotPassword';  // Ensure this is correctly imported
import { useTranslation } from "react-i18next";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const UserAccessScreen = ({ setLoginCredentials, setCurrentLanguage , openTab: initialTab }) => {
  const [openTab, setOpenTab] = useState(initialTab || 'login');
  const [otpEmail, setOtpEmail] = useState(""); // state to hold the email
  const { i18n, t } = useTranslation(["Translations"]);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18n.changeLanguage("en");
    }
  }, [i18n]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-customgray p-4 md:p-12 lg:flex-row lg:px-16 lg:py-12">
      <div className="flex flex-col-reverse md:flex-row bg-white rounded-2xl shadow-lg w-full max-w-6xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 items-center flex flex-col justify-center">
          {openTab === 'otp' && <OTP openTab={openTab} setOpenTab={setOpenTab} otpEmail={otpEmail} t={t} />}
          {openTab === 'forgotPassword' && <ForgotPassword setOpenTab={setOpenTab} setOtpEmail={setOtpEmail} t={t} />}
          {openTab === 'login' && (
            <GoogleOAuthProvider clientId={clientId}>
              <Login
                openTab={openTab}
                setOpenTab={setOpenTab}
                setLoginCredentials={setLoginCredentials}
                i18n={i18n}
                t={t}
                setCurrentLanguage={setCurrentLanguage}
              />
            </GoogleOAuthProvider>
          )}
          {openTab === 'signup' && <SignUp openTab={openTab} setOpenTab={setOpenTab} t={t} />}
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-full md:w-1/2">
          <img
            className="w-full h-full object-cover"
            src={openTab === 'login' ? illustration : illustrationGirl}
            alt="Background"
          />
        </div>
      </div>
    </section>
  );
};

export default UserAccessScreen;
