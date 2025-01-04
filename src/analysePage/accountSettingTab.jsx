import React from 'react';
import accountLogo from "../assets/images/account.png";
import { useTranslation } from 'react-i18next';

const AccountTab = ({ openTab, t }) => {

  return (
    <div className={'block'}>
      <div className="w-[554px] h-[71px] relative">
        <div className="w-[550px] h-[71px] top-0 absolute bg-[#ecf8f5] rounded-2xl"></div>
        <div className="left-[69px] top-[26px] absolute text-[#005666] text-base font-medium font-['Proxima Nova'] leading-snug">
          {t("accountDetails")}
        </div>
        <div className="w-10 h-10 left-[14px] top-[16px] absolute">
          <div className="w-10 h-10 left-0 top-0 absolute bg-[#006d81] rounded-full">
          </div>
          <div className="w-6 h-6 pl-[4.60px] pr-[4.26px] pt-[1.25px] pb-[1.45px] left-[8px] top-[8px] absolute justify-center items-center inline-flex"><img src={accountLogo} alt="" /></div>
        </div>
      </div>

      <p className="text-[#3277df] text-sm text-base font-normal font-['Proxima Nova'] leading-tight ml-16">
        {t("accountInfoText")}
      </p>

      <div className="max-w-md mx-auto bg-white">
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">{t("name")}</label>
          <input
            type="text"
            id="name"
            placeholder={t("namePlaceholder")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">{t("email")}</label>
          <input
            type="email"
            id="email"
            placeholder={t("emailPlaceholder")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <a className="text-[#ff765b] text-sm" href="">
          {t("forgotPassword")}
        </a>

        {/* Button Group */}
        <div className="flex justify-between mt-4">
          {/* Delete Button */}
          <button className="bg-[#fff] btn-wide text-gray-800 border-2 px-12 py-2 rounded-full hover:bg-[#ff765b] focus:outline-none focus:bg-teal-600">
            {t("delete")}
          </button>

          {/* Save Button */}
          <button className="bg-[#fff] btn-wide text-gray-800 px-12 py-2 border-2 rounded-full hover:bg-[#ff765b] focus:outline-none focus:bg-[#ff765b]">
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
