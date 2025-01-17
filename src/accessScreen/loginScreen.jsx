import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import the GoogleOAuthProvider
import illustration from "../assets/images/Illustration.jpg";
import illustrationGirl from "../assets/images/Illustrationgirl.jpg";
import OTP from '../accessScreen/otp';
import SignUp from '../accessScreen/signup';
import Login from '../accessScreen/login';
import ForgotPassword from '../accessScreen/forgotPassword';
import PasswordReset from './resetPassword';
import { useTranslation } from "react-i18next";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const UserAccessScreen = ({ setLoginCredentials, setCurrentLanguage }) => {
  const [openTab, setOpenTab] = useState('login');
  const [otpEmail, setotpEmail] = useState("");
  const { i18n, t } = useTranslation(["Translations"]);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18n.changeLanguage("en");
    }
  }, [i18n]);

  return (
    <section className="flex flex-col gap-8 bg-customgray h-screen md:p-12 lg:flex-row lg:px-16 lg:py-12">
      <div className="flex flex-col justify-between bg-white rounded-2xl shadow-[0px_50px_60px_-20px_#223A2833] w-full h-full md:flex-row">
        {openTab === 'otp' && <OTP openTab={openTab} setOpenTab={setOpenTab} otpEmail={otpEmail} t={t} />}
        {openTab === 'forgotPassword' && <ForgotPassword setOpenTab={setOpenTab} setotpEmail={setotpEmail} t={t} />}
        {openTab === 'login' &&
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
        }
        {openTab === 'signup' && <SignUp openTab={openTab} setOpenTab={setOpenTab} t={t} />}
        {openTab === 'resetPassword' && <PasswordReset t={t} />}

        <div className="hidden w-full md:w-6/12 md:block lg:w-7/12">
          <img className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl" src={openTab === 'login' ? illustration : illustrationGirl} alt="Background" />
        </div>
      </div>
    </section>
  );
};

export default UserAccessScreen;
