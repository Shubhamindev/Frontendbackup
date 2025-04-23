import React, { useState } from "react";
import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";
import FourthPage from "./pages/FourthPage";
import AccountService from "../../../services/account/AccountService";
import { toast, ToastContainer } from "react-toastify";
import { useLoading } from "../../../contexts/LoadingContext";

const OnBoarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [accountData, setAccountData] = useState({
    arn: "",
    accountName: "",
    accountID: "",
    region: "",
  });
  const { showLoading, hideLoading } = useLoading();

  const goToNext = () => setCurrentStep((prev) => prev + 1);
  const goToPrevious = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    showLoading();
    try {
      console.log("Submitting accountData:", accountData);
      
      // Call the API service to create the account
      const response = await AccountService.createAccount(accountData);
      
      console.log("API Response:", response);
      toast.success("Onboarding complete!");
      goToNext();
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error(error.message || "Failed to create account. Please try again.");
    } finally {
      hideLoading();
    }
  };

  return (
    <div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
      {currentStep === 1 && (
        <FirstPage
          accountData={accountData}
          setAccountData={setAccountData}
          onNext={goToNext}
        />
      )}
      {currentStep === 2 && (
        <SecondPage
          accountData={accountData}
          setAccountData={setAccountData}
          onNext={goToNext}
          onBack={goToPrevious}
        />
      )}
      {currentStep === 3 && (
        <ThirdPage
          accountData={accountData}
          setAccountData={setAccountData}
          onBack={goToPrevious}
          onSubmit={handleSubmit}
        />
      )}
      {currentStep === 4 && (
        <FourthPage 
          accountData={accountData}
        />
      )}
    </div>
  );
};

export default OnBoarding;