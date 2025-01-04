import React, { useState } from 'react';
import { Transition } from '@headlessui/react'; // Make sure to install this package
import SubscribeTab from './subscriptionTab';
import RestorePurchaseTab from './restorePurchase';
import FollowUpTab from './followUpTab';
import AccountTab from './accountSettingTab';
import PrivacyTab from './privacyPolicyTab';
import CountryLanguageSelector from './chooseLanguageTab';
import TermsTab from './termsOfUseTab';

const SettingsModal = ({ t }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openTab, setOpenTab] = useState('subscribe');

  return (
    <div className="text-end lg:text-start">
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-3 text-base text-primary font-semibold rounded-[100px] px-4 py-3 w-full hover:text-white hover:bg-secondary lg:text-lg lg:p-4"
      >
        <i className="fa-solid fa-gear"></i>
        Setting
      </button>

      {modalOpen && (
        <div className="fixed top-0 left-0 z-[99] flex items-center justify-center w-screen h-screen">
          <Transition
            show={modalOpen}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-sm"
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
            <div className="relative w-full bg-white shadow-md drop-shadow-md backdrop-blur-sm md:max-w-[700px] lg:max-w-[975px] md:rounded-2xl">
              <div className="relative flex items-center justify-between border-b-[1px] border-b-[#E5E7E7] px-14 py-8">
                <h3 className="text-2xl text-[#006D81] font-semibold">Settings</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 mt-5 mr-5 text-gray-600 rounded-full hover:text-gray-800 hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex gap-16 px-11 py-8">
                <div className="flex flex-col gap-2 w-4/12">
                  <button
                    onClick={() => setOpenTab('subscribe')}
                    className={`inline-flex items-center gap-3 text-base rounded-[100px] w-full px-4 py-3 duration-200 ease-in-out ${openTab === 'subscribe' ? 'text-white bg-info' : 'text-primary bg-transparent'
                      } lg:text-lg lg:p-4`}
                  >
                    <i className="fa-regular fa-bell"></i>
                    {t("subscription")}
                  </button>
                  <button
                    onClick={() => setOpenTab('restore')}
                    className={`inline-flex items-center gap-3 text-base rounded-[100px] w-full px-4 py-3 duration-200 ease-in-out ${openTab === 'restore' ? 'text-white bg-info' : 'text-primary bg-transparent'
                      } lg:text-lg lg:p-4`}
                  >
                    <i className="fa-regular fa-window-restore"></i>
                    {t("restore_purchase")}
                  </button>
                  <button
                    onClick={() => setOpenTab('follow')}
                    className={`inline-flex items-center gap-3 text-base rounded-[100px] w-full px-4 py-3 duration-200 ease-in-out ${openTab === 'follow' ? 'text-white bg-info' : 'text-primary bg-transparent'
                      } lg:text-lg lg:p-4`}
                  >
                    <i className="fa-regular fa-window-restore"></i>
                    {t("follow_up_questions")}
                  </button>
                  <button
                    onClick={() => setOpenTab('Account')}
                    className={`inline-flex items-center gap-3 text-base rounded-[100px] w-full px-4 py-3 duration-200 ease-in-out ${openTab === 'Account' ? 'text-white bg-info' : 'text-primary bg-transparent'
                      } lg:text-lg lg:p-4`}
                  >
                    <i className="fa-regular fa-window-restore"></i>
                    {t("my_account")}
                  </button>
                  <button
                    onClick={() => setOpenTab('Choose')}
                    className={`inline-flex items-center gap-3 text-base rounded-[100px] w-full px-4 py-3 duration-200 ease-in-out ${openTab === 'Choose' ? 'text-white bg-info' : 'text-primary bg-transparent'
                      } lg:text-lg lg:p-4`}
                  >
                    <i className="fa-regular fa-window-restore"></i>
                    {t("choose_language")}
                  </button>
                  <button
                    onClick={() => setOpenTab('Privacy')}
                    className={`inline-flex items-center gap-3 text-base rounded-[100px] w-full px-4 py-3 duration-200 ease-in-out ${openTab === 'Privacy' ? 'text-white bg-info' : 'text-primary bg-transparent'
                      } lg:text-lg lg:p-4`}
                  >
                    <i className="fa-regular fa-window-restore"></i>
                    {t("privacyPolicy")}
                  </button>
                  <button
                    onClick={() => setOpenTab('Terms')}
                    className={`inline-flex items-center gap-3 text-base rounded-[100px] w-full px-4 py-3 duration-200 ease-in-out ${openTab === 'Terms' ? 'text-white bg-info' : 'text-primary bg-transparent'
                      } lg:text-lg lg:p-4`}
                  >
                    <i className="fa-regular fa-window-restore"></i>
                    {t("termsOfUse")}
                  </button>
                </div>
                <div className="w-8/12">
                  {openTab === 'subscribe' && <div><SubscribeTab openTab={openTab} t={t} /></div>}
                  {openTab === 'restore' && <div><RestorePurchaseTab openTab={openTab} t={t} /></div>}
                  {openTab === 'follow' && <div><FollowUpTab openTab={openTab} t={t} /></div>}
                  {openTab === 'Account' && <div><AccountTab openTab={openTab} t={t} /></div>}
                  {openTab === 'Choose' && <div><CountryLanguageSelector openTab={openTab} t={t} /></div>}
                  {openTab === 'Privacy' && <div><PrivacyTab openTab={openTab} t={t} /></div>}
                  {openTab === 'Terms' && <div><TermsTab openTab={openTab} t={t} /></div>}
                </div>
              </div>
            </div>
          </Transition>
        </div >
      )}
    </div >
  );
};

export default SettingsModal;
