import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import accountLogo from "../assets/images/account.png";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const updateURL = process.env.REACT_APP_BACKEND_URL + "/api/updateUserName";
const deleteURL = process.env.REACT_APP_BACKEND_URL + "/api/deleteUser";

const AccountTab = ({ openTab, first_name, email, t }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(first_name || '');
  const [userEmail, setUserEmail] = useState(email || '');
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(updateURL, {
        email: userEmail,
        name: userName
      });

      if (response.status === 200) {
        toast.success("Account details updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to update account details.");
      }
    } catch (error) {
      console.error("Error updating account details:", error);
      toast.error("An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(deleteURL, {
        data: { email: userEmail }
      });

      if (response.status === 200) {
        toast.success("Account deleted successfully!");
        navigate("/");
      } else {
        toast.error("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("An error occurred while deleting the account.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className={'block h-[430px] overflow-y-auto'}>
      <ToastContainer />
      <div className="w-full h-[71px] bg-[#ecf8f5] rounded-2xl flex justify-between items-center p-4">
        <div className="text-[#005666] text-base font-medium leading-snug font-['Proxima Nova'] text-center">
          {t("accountDetails")}
        </div>
        <div className="w-10 h-10 bg-[#006d81] rounded-full overflow-hidden justify-center items-center inline-flex">
          <img src={accountLogo} alt="" />
        </div>
      </div>

      <p className="text-[#3277df] text-sm font-normal font-['Proxima Nova'] leading-tight text-justify">
        {t("accountInfoText")}
      </p>

      <div className="max-w-md mx-auto bg-white px-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm text-left font-bold mb-2">{t("name")}</label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${!isEditing ? 'bg-gray-100' : ''}`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm text-left font-bold mb-2">{t("email")}</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            disabled={true}
            className={`w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500`}
          />
        </div>

        <div className="flex justify-center">
          <a className="text-[#ff765b] text-sm" href="">
            {t("forgotPassword")}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-[#fff] btn-wide text-gray-800 border-2 text-center px-12 py-2 rounded-full hover:bg-[#ff765b] focus:outline-none focus:bg-[#ff765b]"
            disabled={loading}
          >
            {loading ? t("deleting") : t("delete")}
          </button>

          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-[#fff] btn-wide text-gray-800 px-12 py-2 border-2 rounded-full hover:bg-[#ff765b] focus:outline-none focus:bg-[#ff765b]"
            disabled={loading}
          >
            {loading ? t("saving") : isEditing ? t("save") : t("edit")}
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-secondary text-white rounded" onClick={handleDelete} disabled={loading}>{loading ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountTab;
