import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import walletLogo from "../assets/images/Group 1686552886.png";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51PrDciRqntFh4boqzfXyXefoqV1iWvzRiYMl3kD8aqBBOPGu3KPCHr9wG7HZMGJmrPzfnF2RNw2jL8BpdqGiD4tD00uded60JB"); // Your publishable key

const handleCheckout = async () => {
  const stripe = await stripePromise;
  const response = await fetch("http://localhost:8000/api/create-checkout-session/", {
    method: "POST",
  });
  const session = await response.json();
  console.log(session)
  const result = await stripe.redirectToCheckout({ sessionId: session.id });
  if (result.error) {
    alert(result.error.message);
  }
};


const SubscriptionTab = ({ t }) => {
  const [renewTransaction, setRenewTransaction] = useState(false);

  return (
    <div className="w-full max-w-full mx-auto px-4 overflow-x-hidden"> {/* Ensure no overflow beyond screen */}
      <div className="w-full max-w-[554px] h-[430px] overflow-y-auto">
        {/* Renewal Date Section */}
        <div className="flex justify-between items-center bg-[#ecf8f5] rounded-2xl p-4 mb-6">
          <div className="text-center text-[#005666] text-base font-bold">{t("renewalDate")}</div>
          <div className="text-center text-[#005666] text-base font-bold">{t("renewalDateValue")}</div>
          <div className="w-10 h-10 bg-[#006d81] rounded-full overflow-hidden">
            <img src={walletLogo} alt="Wallet Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Subscription Options Section */}
        <div className="flex flex-wrap gap-4 justify-start overflow-x-auto mb-6"> {/* Horizontal scroll allowed */}
          {/* Subscription Option 1 */}
          <div className="w-full sm:w-[122px] h-[132px] relative flex-shrink-0">
            <button onClick={handleCheckout} className="w-full h-full bg-white rounded-[10px] border border-[#b5b5b5] flex flex-col justify-center items-start gap-2 hover:border-[#ff765b] hover:text-[#ff765b] p-3">
              <div className="self-stretch text-[#b5b5b5] text-xs font-bold">{t("threeMonths")}</div>
              <div className="self-stretch text-[#b5b5b5] text-2xl font-semibold">{t("threeMonthsPrice")}</div>
              <div className="self-stretch text-[#b5b5b5] text-[10px] font-bold">{t("threeMonthsDetails")}</div>
            </button>
            <div className="absolute top-0 left-0 w-[75px] h-[19px] bg-[#ff765b] rounded flex justify-center items-center">
              <div className="text-white text-[7px] font-bold">{t("bestValue")}</div>
            </div>
          </div>

          {/* Other Subscription Options */}
          <SubscriptionOption title="sevenMessages" price="sevenMessagesPrice" details="oneTimePayment" t={t} />
          <SubscriptionOption title="threeMessages" price="threeMessagesPrice" details="oneTimePayment" t={t} />
          <SubscriptionOption title="oneYear" price="oneYearPrice" details="oneTimePayment" t={t} />
        </div>

        {/* Subscription Information */}
        <p className="mt-4 text-center">{t("subscriptionInfo")}</p>

        {/* Container for the toggle and button */}
        <div className="flex justify-between items-center mt-6 w-full gap-4 flex-wrap">
          {/* Toggle Switch on the Left */}
          <label className="inline-flex items-center cursor-pointer w-full sm:w-auto">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={renewTransaction}
              onChange={() => setRenewTransaction(!renewTransaction)}
            />
            <div className="relative w-11 h-6 bg-[#ff765b] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-[#ff765b] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff765b]">
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900">{t("renewTransaction")}</span>
          </label>

          {/* Done Button on the Right */}
          <button className="w-full sm:w-[183px] h-[52px] bg-[#b5b5b5] rounded-[100px] shadow hover:bg-[#ff765b] flex-shrink-0">
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
    <div className="w-full sm:w-[122px] h-[132px] relative flex-shrink-0">
      <button className="w-full h-full bg-white rounded-[10px] border border-[#b5b5b5] flex flex-col justify-center items-start gap-2 hover:border-[#ff765b] hover:text-[#ff765b] p-3">
        <div className="text-[#b5b5b5] text-xs font-bold">{t(title)}</div>
        <div className="text-[#b5b5b5] text-2xl font-semibold">{t(price)}</div>
        <div className="text-[#b5b5b5] text-[10px] font-bold">{t(details)}</div>
      </button>
    </div>
  );
};

export default SubscriptionTab;
