import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import SubscribeTab from './subscriptionTab';
import RestorePurchaseTab from './restorePurchase';
import FollowUpTab from './followUpTab';
import AccountTab from './accountSettingTab';
import PrivacyTab from './privacyPolicyTab';
import CountryLanguageSelector from './chooseLanguageTab';
import TermsTab from './termsOfUseTab';

const SettingsModal = ({ first_name, email, t }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openTab, setOpenTab] = useState('subscribe');

  return (
    <div className="text-end lg:text-start">
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-3 text-base text-primary font-proximasemibold rounded-full px-4 py-3 w-full hover:text-white hover:bg-secondary lg:text-lg lg:p-4"
      >
        <i className="fa-solid fa-gear"></i>
        {t("Settings")}
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center w-screen h-screen px-4">
          <Transition
            show={modalOpen}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Background Overlay */}
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
          </Transition>

          <Transition
            show={modalOpen}
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <div className="relative w-full max-w-[95%] sm:max-w-[700px] lg:max-w-[975px] bg-white shadow-md rounded-2xl overflow-hidden">

              {/* Header */}
              <div className="flex justify-between items-center border-b p-6">
                <h3 className="text-2xl text-[#006D81] font-proximasemibold">{t("Settings")}</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-6">

                {/* Sidebar - Navigation Tabs */}
                <div className="flex flex-row lg:flex-col w-full lg:w-4/12 gap-2 overflow-x-auto lg:overflow-visible">
                  {[
                    { key: 'subscribe', label: t("subscription"), icon: "fa-bell" },
                    { key: 'restore', label: t("restore_purchase"), icon: "fa-window-restore" },
                    { key: 'follow', label: t("follow_up_questions"), icon: "fa-window-restore" },
                    { key: 'Account', label: t("my_account"), icon: "fa-user" },
                    { key: 'Privacy', label: t("privacyPolicy"), icon: "fa-lock" },
                    { key: 'Terms', label: t("termsOfUse"), icon: "fa-file-contract" },
                  ].map(({ key, label, icon }) => (
                    <button
                      key={key}
                      onClick={() => setOpenTab(key)}
                      className={`flex items-center gap-2 text-sm lg:text-base px-4 py-2 rounded-full transition-all duration-200 w-auto lg:w-full ${openTab === key ? "bg-info text-white" : "text-primary bg-transparent"
                        }`}
                    >
                      <i className={`fa-regular ${icon}`}></i>
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="w-full lg:w-8/12">
                  {openTab === 'subscribe' && <SubscribeTab openTab={openTab} t={t} />}
                  {openTab === 'restore' && <RestorePurchaseTab openTab={openTab} t={t} />}
                  {openTab === 'follow' && <FollowUpTab openTab={openTab} t={t} />}
                  {openTab === 'Account' && <AccountTab openTab={openTab} first_name={first_name} email={email} t={t} />}
                  {openTab === 'Privacy' && <PrivacyTab openTab={openTab} t={t} />}
                  {openTab === 'Terms' && <TermsTab openTab={openTab} t={t} />}
                </div>
              </div>
            </div>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default SettingsModal;
