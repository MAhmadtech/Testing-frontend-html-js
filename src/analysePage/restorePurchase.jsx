import React from 'react';
import { useTranslation } from 'react-i18next';
import restoreLogo from "../assets/images/Group 2.png";

const RestorePurchaseTab = ({ openTab, onCancel, onKeep, t }) => {
  return (
    <div
      style={{ display: openTab === 'restore' ? 'block' : 'none' }}
      className="w-full max-w-[554px] h-[430px] mx-auto flex flex-col relative"
    >
      <div className="relative flex-1 flex flex-col justify-between">
        {/* Billing Cycle Header */}
        <div className="w-full h-[71px] bg-[#ecf8f5] rounded-2xl flex justify-between items-center p-4">
          <div className="text-[#005666] text-base font-medium leading-snug font-['Proxima Nova'] text-center">
            {t("billingCycle")}
          </div>
          <div className="text-[#005666] text-base font-medium leading-snug font-['Proxima Nova'] text-center">
            {t("monthly")}
          </div>
          <div className="w-10 h-10 bg-[#006d81] rounded-full overflow-hidden">
            <img src={restoreLogo} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Cancellation Prompt */}
        <div className="mt-4 px-4 text-[#005666] text-base font-normal leading-tight font-['Proxima Nova'] text-center">
          {t("cancelPrompt")}
        </div>
      </div>

      {/* Action Buttons - Centered at the bottom using absolute positioning */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-3 items-center justify-center flex-wrap px-4 pb-4">
        <button className="bg-[#fff] btn-wide text-gray-800 border-2 text-center px-12 py-2 rounded-full hover:bg-[#ff765b] focus:outline-none focus:bg-teal-600">
          {t("delete")}
        </button>
        <button className="bg-[#fff] btn-wide text-gray-800 px-12 py-2 border-2 rounded-full hover:bg-[#ff765b] focus:outline-none focus:bg-[#ff765b]">
          {t("save")}
        </button>
      </div>
    </div>
  );
};

export default RestorePurchaseTab;

