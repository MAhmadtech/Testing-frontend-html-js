import React from 'react';
import accountLogo from "../assets/images/account.png";
import { useTranslation } from 'react-i18next';

const AccountTab = ({ openTab, t }) => {
  return (
    <div className={'block h-[430px] overflow-y-auto'}>
      <div className="w-full h-[71px] bg-[#ecf8f5] rounded-2xl flex justify-between items-center p-4">
        <div className="text-[#005666] text-base font-medium leading-snug font-['Proxima Nova'] text-center">
          {t("accountDetails")}
        </div>

        <div className="w-10 h-10 bg-[#006d81] rounded-full overflow-hidden  justify-center items-center inline-flex">
          <img src={accountLogo} alt="" />
        </div>
      </div>


      <p className="text-[#3277df] text-sm font-normal font-['Proxima Nova'] leading-tight text-justify">
        {t("accountInfoText")}
      </p>

      <div className="max-w-md mx-auto bg-white px-4">
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 bg-white text-sm text-left font-bold mb-2">{t("name")}</label>
          <input
            type="text"
            id="name"
            placeholder={t("namePlaceholder")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 bg-white text-sm text-left font-bold mb-2">{t("email")}</label>
          <input
            type="email"
            id="email"
            placeholder={t("emailPlaceholder")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="flex justify-center">
          <a className="text-[#ff765b] text-sm" href="">
            {t("forgotPassword")}
          </a>
        </div>


        {/* Button Group */}
        <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Delete Button */}
          <button className="bg-[#fff] btn-wide text-gray-800 border-2 text-center px-12 py-2 rounded-full hover:bg-[#ff765b] focus:outline-none focus:bg-teal-600">
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
