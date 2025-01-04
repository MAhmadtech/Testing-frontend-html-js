import React from 'react';
import logo from "../assets/images/logo.svg";

const OTP = ({ setOpenTab, otpEmail, t }) => {
  return (
    <div className="bg-[#C9E2DC] w-full h-full p-14 md:w-6/12 md:bg-white md:rounded-tl-2xl md:rounded-bl-2xl lg:w-5/12">
      <div className="container mx-auto max-w-md">
        <img src={logo} alt="Logo" />
        <p className="text-[#035A53] mb-6">{t("underLogoText")}</p>

        <form className="space-y-4">
          <div className="w-full max-w-sm">
            {/* Email Verification Message */}
            <div className="flex flex-col justify-center items-center">
              <p className="text-[#005666] text-xl font-semibold font-['Proxima Nova'] leading-[30px] text-center">
                {t("checkYourEmail")}<br />{t("linkSentMessage")}
              </p>
              <p className="text-[#005666] text-2xl font-semibold font-['Proxima Nova'] leading-[30px]">
                {otpEmail}
              </p>
            </div>

            {/* OTP Input Fields */}
            {/* <div className="flex space-x-2 justify-center mt-4">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 text-center text-lg border-b-2 border-gray-300 focus:outline-none focus:border-teal-500"
                />
              ))}
            </div> */}
          </div>
        </form>
      </div>

      {/* Resend Code Message */}
      <div className="flex justify-center mt-36">
        <button onClick={(e) => {
          e.preventDefault();
          setOpenTab('forgotPassword');
        }} className="text-center text-[#3277df] text-sm font-medium font-['Proxima Nova'] leading-tight">
          {t("didNotReceiveCode")}
        </button>
      </div>

      {/* Send Button */}
    </div>
  );
};

export default OTP;
