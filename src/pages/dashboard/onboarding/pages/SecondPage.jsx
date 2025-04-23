import React from "react";
import Card from "../../components/Card";
import ScrollCard from "../../components/ScrollCard";
import { ClipboardCopy } from "lucide-react";
import { JSON,JSON2,JSON3,JSON4 } from "./data/SecondPage";
import { toast,ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
const SecondPage = ({ onNext, onBack }) => {

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
      <h1 className="text-2xl font-semibold mb-2">Add Customer Managed Policies</h1>
      <p className="text-sm text-gray-600 mb-6">
        Create an Inline Policies for the Role by following these steps
      </p>
      <Card className="px-6 py-8">
        <ol className="space-y-10">
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              1
            </div>
            <div className="text-sm text-gray-800">
              Go to the Create <strong className="underline">Policy</strong>{" "}
              Page.
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              2
            </div>
            <div className="text-sm text-gray-800 w-full">
              Click on the
              <strong> JSON </strong> tab and paste the following policy and
              click on Next:
              <div className="mt-3 w-full border border-gray-300 rounded-md">
                <ScrollCard content={JSON} className="w-full" />
              </div>
            </div>
          </li>
      

        <li className="flex items-start  gap-4">
          <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
            3
          </div>
          <div className="text-sm text-gray-800 w-full">
          In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy
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
          </div>
        </li>
        <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              4
            </div>
            <div className="text-sm text-gray-800">
            Again, go to the <strong className="underline">Create Policy</strong>{" "}
            Page.
            </div>
          </li>
          <li className="flex items-start  gap-4">
          <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
            5
          </div>
          <div className="text-sm text-gray-800 w-full">
          Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
          <div className="mt-3 w-full border border-gray-300 rounded-md">
                <ScrollCard content={JSON2} className="w-full" />
              </div>
          </div>
        </li>
        <li className="flex items-start  gap-4">
          <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
            6
          </div>
          <div className="text-sm text-gray-800 w-full">
          In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy
            <div
              className="relative mt-3 w-full max-w-sm group cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText("cktuner-SecAuditPolicy");
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
          </div>
        </li>
        <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              7
            </div>
            <div className="text-sm text-gray-800">
            Again, go to the <strong className="underline">Create Policy</strong>{" "}
            Page.
            </div>
          </li>
          <li className="flex items-start  gap-4">
          <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
            8
          </div>
          <div className="text-sm text-gray-800 w-full">
          Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:
          <div className="mt-3 w-full border border-gray-300 rounded-md">
                <ScrollCard content={JSON3} className="w-full" />
              </div>
          </div>
        </li>
          <li className="flex items-start  gap-4">
          <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
            9
          </div>
          <div className="text-sm text-gray-800 w-full">
          In the <strong>Name</strong> field, enter below-mentioned policy name and click on Create Policy
            <div
              className="relative mt-3 w-full max-w-sm group cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText("cktuner-TunerReadEssentials");
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
          </div>
        </li>
        <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              10
            </div>
            <div className="text-sm text-gray-800 w-full">
            Go to the <strong className="underline">CK-Tuner-Role</strong>{" "}
            <div className="mt-4">
                <img
                  src="/onboarding/10.png"
                  alt="IAM Role Screenshot"
                  className="rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            </div>
          </li>
          <li className="flex items-start gap-4 w-full">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              11
            </div>
            <div className="text-sm text-gray-800">
            In Permission policies, click on  <strong >Add permissions {" > "} Attach Policy</strong>
            <div className="mt-4">
                <img
                  src="/onboarding/11.png"
                  alt="IAM Role Screenshot"
                  className="rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            </div>
          </li>
          <li className="flex items-start gap-4 w-full">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              12
            </div>
            <div className="text-sm text-gray-800">
            Filter by Type{" > "}Customer managed then search for <strong >cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials</strong> and select them.
            <div className="mt-4">
                <img
                  src="/onboarding/12.png"
                  alt="IAM Role Screenshot"
                  className="rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              13
            </div>
            <div className="text-sm text-gray-800">
            Now, click on  <strong className="underline">Review policy</strong>{" "}
            </div>
          </li>
          <li className="flex items-start gap-4 w-full">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              14
            </div>
            <div className="text-sm text-gray-800">
            In Permission policies, click on <strong >Add permissions{">"}  Create inline policy</strong> 
            <div className="mt-4">
                <img
                  src="/onboarding/14.png"
                  alt="IAM Role Screenshot"
                  className="rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            </div>
          </li>
          <li className="flex items-start  gap-4">
          <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
            15
          </div>
          <div className="text-sm text-gray-800 w-full">
          Click on the <strong>JSON</strong> and paste the following policy
          <div className="mt-3 w-full border border-gray-300 rounded-md">
                <ScrollCard content={JSON4} className="w-full" />
              </div>
          </div>
        </li>
        <li className="flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              16
            </div>
            <div className="text-sm text-gray-800">
            Now, click on <strong className="underline">Review Policy</strong>{" "}
             
            </div>
          </li>
          <li className="flex items-start  gap-4">
          <div className="w-7 h-7 rounded-full text-sm flex items-center justify-center font-bold bg-blue-600 text-white">
            17
          </div>
          <div className="text-sm text-gray-800 w-full">
          In the <strong>Name</strong> field, enter below-mentioned policy name and click on <strong> Create Policy </strong>
            <div
              className="relative mt-3 w-full max-w-sm group cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText("S3CrossAccountReplication");
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
      <div className="flex justify-end gap-5">
      
        <button
          onClick={onBack}
          className="px-5 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
        >
          Back - Create IAM Role
        </button>
        <button
          onClick={onNext}
          className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Next - Create S3 Buckets
        </button>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
