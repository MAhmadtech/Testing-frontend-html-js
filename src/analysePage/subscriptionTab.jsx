import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import walletLogo from "../assets/images/Group 1686552886.png";

const SubscriptionTab = ({ t }) => {
  const [renewTransaction, setRenewTransaction] = useState(false);

  return (
    <div className="w-8/12">
      <div className="w-[555px] h-[430px] relative">
        {/* Renewal Date Section */}
        <div className="w-[554px] h-[71px] absolute">
          <div className="w-[554px] h-[71px] bg-[#ecf8f5] rounded-2xl relative">
            <div className="absolute left-[71px] top-[26px] text-center text-[#005666] text-base font-bold leading-snug">
              {t("renewalDate")}
            </div>
          </div>
          <div className="absolute left-[436px] top-[24px] text-center text-[#005666] text-base font-bold leading-tight tracking-tight">
            {t("renewalDateValue")}
          </div>
          <div className="absolute left-[16px] top-[16px]">
            <div className="w-10 h-10 bg-[#006d81] rounded-full">
              <img src={walletLogo} alt="" />
            </div>
          </div>
        </div>

        {/* Subscription Options Section */}
        <div className="h-[132px] absolute left-0 top-[103px] flex gap-[22px]">
          {/* Subscription Option 1 */}
          <div className="w-[122px] h-[132px] relative">
            <button className="w-[122px] h-[123px] bg-white rounded-[10px] border border-[#b5b5b5] flex flex-col justify-center items-start gap-[5px] hover:border-[#ff765b] hover:text-[#ff765b] p-[9px]">
              <div className="self-stretch text-[#b5b5b5] text-xs font-bold leading-tight">{t("threeMonths")}</div>
              <div className="self-stretch h-[34px] text-[#b5b5b5] text-2xl font-semibold leading-[30px]">{t("threeMonthsPrice")}</div>
              <div className="self-stretch text-[#b5b5b5] text-[10px] font-bold leading-[14px]">
                {t("threeMonthsDetails")}
              </div>
            </button>
            <div className="absolute left-[24px] top-0 w-[75px] h-[19px] bg-[#ff765b] rounded flex justify-center items-center">
              <div className="text-center text-white text-[7px] font-bold">{t("bestValue")}</div>
            </div>
          </div>

          {/* Other Subscription Options */}
          <SubscriptionOption title="sevenMessages" price="sevenMessagesPrice" details="oneTimePayment" t={t} />
          <SubscriptionOption title="threeMessages" price="threeMessagesPrice" details="oneTimePayment" t={t} />
          <SubscriptionOption title="oneYear" price="oneYearPrice" details="oneTimePayment" t={t} />
        </div>

        {/* Subscription Information */}
        <p className="mt-4">
          {t("subscriptionInfo")}
        </p>

        {/* Toggle Switch */}
        <label className="inline-flex items-center cursor-pointer mt-72">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={renewTransaction}
            onChange={() => setRenewTransaction(!renewTransaction)}
          />
          <div className="relative w-11 h-6 bg-[#ff765b] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-[#ff765b] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff765b]"></div>
          <span className="ml-3 text-sm font-medium text-gray-900">{t("renewTransaction")}</span>
        </label>

        {/* Done Button */}
        <div className="absolute left-[372px] top-[378px]">
          <button className="w-[183px] h-[52px] bg-[#b5b5b5] rounded-[100px] shadow hover:bg-[#ff765b]">
            <div className="text-center text-[#fdfdfd] text-base font-bold uppercase tracking-wide">
              {t("done")}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Subscription Option Component
const SubscriptionOption = ({ title, price, details, t }) => {
  return (
    <button className="w-[122px] h-[123px] bg-white rounded-[10px] border border-[#b5b5b5] flex flex-col justify-center items-start gap-[5px] hover:border-[#ff765b] hover:text-[#ff765b] p-[9px]">
      <div className="self-stretch text-[#b5b5b5] text-xs font-bold leading-tight">{t(title)}</div>
      <div className="self-stretch h-[34px] text-[#b5b5b5] text-2xl font-semibold leading-[30px]">{t(price)}</div>
      <div className="self-stretch text-[#b5b5b5] text-[10px] font-bold leading-[14px]">{t(details)}</div>
    </button>
  );
};

export default SubscriptionTab;
