import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import illustrationGirl from "../assets/images/Illustrationgirl.jpg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18next from "i18next";

const PasswordReset = () => {

  const { i18n, t } = useTranslation(["Translations"]);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const URL = process.env.REACT_APP_BACKEND_URL + "/api/resetPassword";

  const handleResetPassword = async (ev) => {
    ev.preventDefault();
    const newpassword = ev.target.newpassword.value;
    const confirmpassword = ev.target.confirmpassword.value;

    if (newpassword !== confirmpassword) {
      toast.error("Passwords do not match!");
      return; // Stop the function execution here
    }

    try {
      console.log(token);
      const formData = { id, token, password: newpassword };
      const res = await axios.post(URL, formData);
      const data = res.data;

      if (data.success) {
        toast.success(data.message);
        console.log(data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password.");
    }
  };

  return (
    <section className="flex flex-col gap-8 bg-customgray h-screen md:p-12 lg:flex-row lg:px-16 lg:py-12">

      {/* ToastContainer is added here for toast notifications */}
      <ToastContainer />

      <div className="flex flex-col justify-between bg-white rounded-2xl shadow-[0px_50px_60px_-20px_#223A2833] w-full h-full md:flex-row">

        <div className="bg-[#C9E2DC] w-full h-full p-14 md:w-6/12 md:bg-white md:rounded-tl-2xl md:rounded-bl-2xl lg:w-5/12">
          <select
            value={localStorage.getItem("i18nextLng")}
            onChange={handleLanguageChange}
          >
            {/* //make sure to use the same json file name as the values */}
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
          <div className="container mx-auto max-w-md">
            <img src={logo} alt="Logo" />
            <p className="text-[#035A53] mb-6">{t("underLogoText")}</p>

            <form className="space-y-4" onSubmit={handleResetPassword}>
              <div>
                <label className="block text-gray-700 mb-2">{t("password")}</label>
                <div className="relative w-full max-w-sm">
                  <input
                    id="newpassword"
                    name="newpassword"
                    type={showPassword1 ? "text" : "password"}
                    placeholder="●●●●●●●●"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                  <span
                    onClick={() => setShowPassword1(!showPassword1)}
                    className="absolute right-3 top-2 text-orange-500 cursor-pointer"
                  >
                    {/* Eye icon for toggling password visibility */}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t("confirmPassword")}</label>
                <div className="relative w-full max-w-sm">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="●●●●●●●●"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                  <span
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="absolute right-3 top-2 text-orange-500 cursor-pointer"
                  >
                    {/* Eye icon for toggling password visibility */}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full max-w-sm px-4 py-2 border border-[#ff765b] justify-center bg-[#fff] rounded-[100px] shadow hover:bg-[#ff765b] hover:text-[#fff]"
              >
                RESET PASSWORD
              </button>
            </form>
          </div>
        </div>

        <div className="hidden w-full md:w-6/12 md:block lg:w-7/12">
          <img className="w-full h-full object-cover rounded-tr-2xl rounded-br-2xl" src={illustrationGirl} alt="Background" />
        </div>
      </div>
    </section>
  );
};

export default PasswordReset;
