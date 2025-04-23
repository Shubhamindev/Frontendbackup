import React from "react";
import Card from "../../components/Card";
import { toast,ToastContainer } from "react-toastify";
import { ClipboardCopy } from "lucide-react";
import { Check, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const ThirdPage = ({ onBack, onSubmit,isSubmitting}) => {
  const { role } = useSelector(state => state.auth); // Get user role from Redux
  const isReadOnly = role === "READ-ONLY"; // Check if user is read-only
  return (
    <div className="bg-[#F1F4F6] min-h-screen px-6 sm:px-12 py-10 text-black font-inter">
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
    
      <h1 className="text-2xl font-semibold mb-2">
        Create Cost & Usage Report
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Create a Cost & Usage Report by following these steps
      </p>

      <Card className="px-6 py-8">
        <ol className="space-y-10">
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              1
            </div>
            <div className="text-sm text-gray-800">
              Go to{" "}
              <strong className="underline">Cost and Usage Reports</strong> in
              the Billing Dashboard and click on Create report.
            </div>
          </li>
          <li className="flex items-start  gap-4">
            <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
              2
            </div>
            <div className="text-sm text-gray-800 w-full">
              In the <strong>Name</strong> field, enter below-mentioned policy
              name and click on Create Policy
              <div
                className="relative mt-3 w-full max-w-sm group cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText("cktuner-CostAuditPolicy");
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
                <span className="absolute left-0 mt-1 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity py-8">
                  Click to copy
                </span>
              </div>
              <div className="mt-4 mb-4">
                <p className="text-gray-700 mb-2">
                  Ensure that the following configuration is checked
                </p>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-5 h-5 flex items-center justify-center bg-gray-500 text-white rounded-sm">
                    <Check size={14} />
                  </div>
                  <span className="text-gray-800">Include Resource IDs</span>
                </div>
              </div>
              <p className="mt-4">
                Click on <strong>Next</strong>
              </p>
              <div className="mt-4 w-full">
                <img
                  src="/onboarding/2.png"
                  alt="IAM Role Screenshot"
                  className="rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            </div>
          </li>
          <li className="flex items-start  gap-4">
            <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
              3
            </div>
            <div className="text-sm text-gray-800 w-full">
              In the<strong className="italic">Configure S3 Bucket,</strong>{" "}
              provide the name of the S3 bucket that was created -
              <div className="mt-4 mb-4">
                <p className="text-gray-700 mb-2">
                  Ensure that the following configuration is checked
                </p>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-5 h-5 flex items-center justify-center bg-gray-500 text-white rounded-sm">
                    <Check size={14} />
                  </div>
                  <span className="text-gray-800">
                    The following default policy will be applied to your bucket
                  </span>
                </div>
              </div>
              <p className="mt-4">
                Click on <strong>Next</strong>
              </p>
              <div className="mt-4 w-full">
                <img
                  src="/onboarding/3.png"
                  alt="IAM Role Screenshot"
                  className="rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            </div>
          </li>

          <li className="flex items-start  gap-4">
            <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
              4
            </div>
            <div className="text-sm text-gray-800 w-full">
              In the <strong className="Italic">Delivery options</strong>
              section, enter the below-mentioned Report path prefix -
              <label className="block text-gray-700 ">
                Report path prefix:
              </label>
              <div
                className="relative mt-3 w-full max-w-sm group cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText("275595855473");
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
                <span className="absolute left-0 mt-1 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity py-8">
                  Click to copy
                </span>
              </div>
              <div className="mt-5 mb-4">
                <p className="text-gray-700 mb-3">
                  Additionally, ensure that the following checks are in place
                </p>

                <div className="mb-4">
                  <p className="text-gray-700 mb-2">Time granularity:</p>
                  <div className="flex items-center gap-2 ml-2">
                    <div className="w-5 h-5 flex items-center justify-center text-gray-300 rounded-full border border-gray-300">
                      <Circle size={10} fill="#2563eb" />
                    </div>
                    <span className="text-gray-800">Hourly</span>
                  </div>
                </div>

                <div className="mb-2">
                  <p className="text-gray-700 mb-2">
                    Please make sure these checks are Enabled in Enable report
                    data integration for:
                  </p>
                  <div className="flex items-center gap-2 ml-2">
                    <div className="w-5 h-5 flex items-center justify-center bg-gray-300 text-white rounded-sm">
                      <Check size={14} />
                    </div>
                    <span className="text-gray-800">Amazon Athena</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 w-full">
                <img
                  src="/onboarding/3.png"
                  alt="IAM Role Screenshot"
                  className="rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              5
            </div>
            <div className="text-sm text-gray-800">
              Click on
              <strong>Next.</strong> Now, review the configuration of the Cost
              and Usage Report. Once satisfied, click on
              <strong>Create Report.</strong>.
            </div>
          </li>
        </ol>
      </Card>
      <div className="flex justify-between mt-12">
        <Link to="/dashboard/users">
          <button className="px-5 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition">
            Cancel
          </button>
        </Link>
        <div className="flex justify-end gap-4">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="px-5 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
          >
            Back - Setup CUR application
          </button>
          {isReadOnly ? (
            <button 
              disabled
              className="px-5 py-2 text-sm font-medium bg-gray-400 text-white rounded-md cursor-not-allowed"
              title="Read-only users cannot submit"
            >
              Submit
            </button>
          ) : (
            <button 
              onClick={onSubmit}
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default ThirdPage;