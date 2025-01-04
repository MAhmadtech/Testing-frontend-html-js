import React from 'react';
import { useTranslation } from 'react-i18next';
import restoreLogo from "../assets/images/Group 2.png";

const RestorePurchaseTab = ({ openTab, onCancel, onKeep, t }) => {

  return (
    <div style={{ display: openTab === 'restore' ? 'block' : 'none' }}>
      <div className="w-[554px] h-[430px] relative">
        {/* Billing Cycle Header */}
        <div className="w-[554px] h-[71px] absolute top-0 left-0">
          <div className="w-[554px] h-[71px] absolute top-0 left-0 bg-[#ecf8f5] rounded-2xl"></div>
          <div className="absolute left-[69px] top-[26px] text-center text-[#005666] text-base font-medium leading-snug font-['Proxima Nova']">
            {t("billingCycle")}
          </div>
          <div className="absolute left-[479px] top-[26px] text-center text-[#005666] text-base font-medium leading-snug font-['Proxima Nova']">
            {t("monthly")}
          </div>
          <div className="w-10 h-10 absolute left-[14px] top-[16px]">
            <div className="w-10 h-10 absolute top-0 left-0 bg-[#006d81] rounded-full">
              <img src={restoreLogo} alt="" />
            </div>
          </div>
        </div>

        {/* Cancellation Prompt */}
        <div className="absolute left-[14px] top-[95px] text-[#005666] text-base font-normal leading-tight font-['Proxima Nova']">
          {t("cancelPrompt")}
        </div>

        {/* Action Buttons */}
        <div className="absolute flex gap-3 items-center justify-start left-[176px] top-[378px] h-[52px]">
          <div className="relative w-[183px] h-[52px]">
            <button
              className="absolute top-0 left-0 w-[183px] h-[52px] rounded-[100px] shadow border border-[#b5b5b5] hover:bg-[#ff765b] hover:cursor-pointer hover:text-white"
              onClick={onCancel}
            >
              <div className="absolute top-[15.17px] left-[44.28px] text-center text-base font-medium uppercase leading-tight tracking-wide font-['Inter']">
                {t("cancel")}
              </div>
            </button>
          </div>
          <div className="relative w-[183px] h-[52px]">
            <button
              className="absolute top-0 left-0 w-[183px] h-[52px] bg-[#b5b5b5] rounded-[100px] shadow hover:bg-[#ff765b] hover:cursor-pointer hover:text-white"
              onClick={onKeep}
            >
              <div className="absolute top-[14px] left-[28.81px] text-center text-base font-medium uppercase leading-tight tracking-wide font-['Inter']">
                {t("keepIt")}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestorePurchaseTab;
