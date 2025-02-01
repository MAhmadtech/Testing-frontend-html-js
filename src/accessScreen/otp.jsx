import React from "react";
import logo from "../assets/images/logo.svg";

const OTP = ({ setOpenTab, otpEmail, t }) => {
  return (
    <div className="bg-white w-full h-full p-6 flex flex-col justify-center text-center md:w-10/12 lg:w-10/12">
      <div className="container mx-auto max-w-md">
        <img src={logo} alt="Logo" />
        <p className="text-[#035A53] text-left mb-6">{t("underLogoText")}</p>

        {/* Email Verification Message */}
        <div className="flex flex-col items-center">
          <p className="text-[#005666] text-lg md:text-xl font-semibold mb-2">
            {t("checkYourEmail")} <br /> {t("linkSentMessage")}
          </p>
          <p className="text-[#005666] text-xl md:text-2xl font-semibold">{otpEmail}</p>
        </div>

        {/* Resend Code & Navigation */}
        <div className="mt-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenTab("forgotPassword");
            }}
            className="text-[#3277df] text-sm md:text-base font-medium hover:underline"
          >
            {t("didNotReceiveCode")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
