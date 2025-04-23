import React from "react";
import Card from "../../components/Card";
import ScrollCard from "../../components/ScrollCard";
import { ClipboardCopy } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import trustPolicy from "./data/FirstPage.jsx";
import { 
  firstPageFormConfig, 
  validateField,
  validateForm 
} from "../../../../config/formconfig/Onboarding.jsx";

const FirstPage = ({ accountData, setAccountData, onNext }) => {
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleInputChange = (field, value) => {
    setAccountData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate on change if the field has been touched
    if (touched[field]) {
      const error = validateField(
        field, 
        value, 
        firstPageFormConfig.fields[field]
      );
      
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(
      field, 
      accountData[field], 
      firstPageFormConfig.fields[field]
    );
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors: validationErrors, isValid } = validateForm(accountData, firstPageFormConfig);
    setErrors(validationErrors);
    
    if (isValid) {
      onNext();
    }
  };

  const isFormComplete = Object.keys(firstPageFormConfig.fields).every(
    (field) => accountData[field] && !errors[field]
  );

  return (
   
    <div className="bg-[#F1F4F6] min-h-screen px-6 sm:px-12 py-10 text-black font-inter">
      <h1 className="text-2xl font-semibold mb-2">Create an IAM Role</h1>
      <p className="text-sm text-gray-600 mb-6">
        Follow these step-by-step instructions to set up an IAM role in your AWS account.
      </p>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />

      <Card className="px-6 py-8">
        <ol className="space-y-10">
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
              1
            </div>
            <div className="text-sm text-gray-800 w-full">
              Sign in to your AWS Console and{" "}
              <a
                href="https://console.aws.amazon.com/iamv2/home?#/roles"
                className="text-blue-600 underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                create an IAM Role.
              </a>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
              2
            </div>
            <div className="text-sm text-gray-800 w-full">
              In the <strong>Trusted entity type</strong> section, choose{" "}
              <strong>Custom trust policy</strong>. Replace the default policy with the one below:
              <div className="mt-3 w-full border border-gray-300 rounded-md">
                <ScrollCard content={trustPolicy} className="w-full" />
              </div>
            </div>
            
          </li>

          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
              3
            </div>
            <div className="text-sm text-gray-800 w-full">
              Click <strong>Next</strong> to skip the <em>Add permissions</em> page.
              No permissions need to be added for now.
            </div>
          </li>

          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
              4
            </div>
            <div className="text-sm text-gray-800 w-full">
              Set the <strong>Role name</strong> to the value below and click <strong>Create Role</strong>:
              <div
                className="relative mt-3 w-full max-w-sm group cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText("CK-Tuner-Role-dev2");
                  toast.success("Copied to clipboard!");
                }}
              >
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-600 transition">
                  <ClipboardCopy size={16} />
                </div>
                <input
                  type="text"
                  readOnly
                  value="CK-Tuner-Role-dev2"
                  className="pl-8 pr-2 py-2 border border-gray-300 rounded-md w-full bg-gray-50 text-sm cursor-pointer hover:bg-white"
                />
                <span className="absolute left-0 mt-10 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to copy
                </span>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
              5
            </div>
            <div className="text-sm text-gray-800 w-full">
              Navigate to the newly created IAM Role and copy the <strong>Role ARN</strong>:
              <div className="mt-4">
                <img
                  src="/onboarding/First.png"
                  alt="IAM Role Screenshot"
                  className="rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
              6
            </div>
            <div className="text-sm text-gray-800 w-full">
              Paste the copied Role ARN and complete the following form:
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(firstPageFormConfig.fields).map(([field, config]) => (
                    <div key={field}>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {config.label} {config.required && "*"}
                      </label>
                      <input
                        type="text"
                        placeholder={config.placeholder}
                        value={accountData[field] || ""}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        onBlur={() => handleBlur(field)}
                        className={`w-full border ${
                          errors[field] ? "border-red-500" : "border-gray-300"
                        } rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                        required={config.required}
                      />
                      {errors[field] && (
                        <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </li>
        </ol>
      </Card>

      <div className="flex justify-between mt-12">
        <button className="px-5 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className={`px-5 py-2 text-sm font-medium rounded-md transition-colors ${
            isFormComplete
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Next - Add Customer Managed Policies
        </button>
      </div>
    </div>
  );
};

export default FirstPage;