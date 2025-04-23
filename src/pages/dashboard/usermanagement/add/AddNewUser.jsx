import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUserFormConfig } from "../../../../../src/config/formconfig/AddUserFormConfig";
import UserService from "../../../../services/user/UserService";
import AccountService from "../../../../services/account/AccountService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoading } from "../../../../contexts/LoadingContext";

const AddNewUser = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    accountIds: [],
  });

  const [allAccounts, setAllAccounts] = useState([]);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [associatedAccounts, setAssociatedAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        showLoading();
        const accountsResponse = await AccountService.getAllAccounts();
        setAllAccounts(accountsResponse);
        setAvailableAccounts(accountsResponse);
      } catch (error) {
        toast.error(error.message || "Failed to fetch accounts");
      } finally {
        hideLoading();
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear account selection if role is changed from CUSTOMER to something else
    if (name === "role" && value !== "CUSTOMER") {
      setAssociatedAccounts([]);
      setAvailableAccounts(allAccounts);
      setFormData((prev) => ({ ...prev, accountIds: [] }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccountSelect = (accountId) => {
    const selectedAccount = availableAccounts.find((acc) => acc.id === accountId);
    if (selectedAccount) {
      setAssociatedAccounts([...associatedAccounts, selectedAccount]);
      setAvailableAccounts(availableAccounts.filter((acc) => acc.id !== accountId));

      setFormData((prev) => ({
        ...prev,
        accountIds: [...prev.accountIds, accountId],
      }));
    }
  };

  const handleRemoveAccount = (accountId) => {
    const removedAccount = associatedAccounts.find((acc) => acc.id === accountId);
    if (removedAccount) {
      setAvailableAccounts([...availableAccounts, removedAccount]);
      setAssociatedAccounts(associatedAccounts.filter((acc) => acc.id !== accountId));

      setFormData((prev) => ({
        ...prev,
        accountIds: prev.accountIds.filter((id) => id !== accountId),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoading();
      const response = await UserService.createUser(formData);
      toast.success(response.message || "User created successfully");
      navigate("/dashboard/users");
    } catch (error) {
      const backendData = error.response?.data;
      if (backendData?.messages && typeof backendData.messages === "object") {
        Object.entries(backendData.messages).forEach(([field, message]) => {
          toast.error(`${field}: ${message}`);
        });
      } else {
        const errorMessage = backendData?.message || error.message || "Something went wrong!";
        toast.error(errorMessage);
      }
    } finally {
      hideLoading();
    }
  };

  const filteredAccounts = availableAccounts.filter((account) =>
    account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.accountID.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <ToastContainer />

      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500">
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <span className="mx-2">/</span>
        <Link to="/dashboard/users" className="hover:text-blue-600">User Management</Link>
        <span className="mx-2">/</span>
        <span>Create</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {addUserFormConfig.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  className="w-full border rounded px-3 py-2"
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  className="w-full border rounded px-3 py-2"
                  placeholder={`Enter ${field.label}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
        </div>

        {/* Manage Account Id(s) Section - only visible for CUSTOMER */}
        {formData.role === "CUSTOMER" && (
          <div className="border rounded-lg p-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manage Account Id(s)</h2>
              <button
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => {
                  setAvailableAccounts(allAccounts);
                  setAssociatedAccounts([]);
                  setSearchTerm("");
                }}
                type="button"
              >
                Reset
              </button>
            </div>

            <div className="flex space-x-4">
              {/* Left Panel */}
              <div className="w-1/2 border-r pr-4">
                <div className="flex items-center mb-2">
                  <span className="text-blue-600 text-sm mr-2">Choose Account ID to Associate</span>
                  <span className="text-gray-500 text-sm">{availableAccounts.length} Available</span>
                </div>
                <input
                  type="text"
                  placeholder="Search by name or ID"
                  className="w-full border rounded px-2 py-1 mb-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto">
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      onChange={() => {
                        if (availableAccounts.length === 0) {
                          setAvailableAccounts(allAccounts);
                          setAssociatedAccounts([]);
                        } else {
                          setAssociatedAccounts([...associatedAccounts, ...availableAccounts]);
                          setAvailableAccounts([]);
                        }
                      }}
                    />{" "}
                    Select All
                  </label>
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => (
                      <label key={account.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={false}
                          onChange={() => handleAccountSelect(account.id)}
                          className="mr-2"
                        />
                        <div>
                          <div className="font-medium">{account.accountName}</div>
                          <div className="text-sm text-gray-500">{account.accountID}</div>
                        </div>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-500 mt-2">No accounts found</p>
                  )}
                </div>
              </div>

              {/* Right Panel */}
              <div className="w-1/2 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600 text-sm">Associated Account IDs</span>
                  <span className="text-gray-500 text-sm">{associatedAccounts.length} Added</span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {associatedAccounts.length === 0 ? (
                    <div className="text-center py-10">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="mt-2 text-gray-500">No Account IDs Added</p>
                      <p className="text-sm text-gray-400">Selected Account IDs will be shown here.</p>
                    </div>
                  ) : (
                    <ul>
                      {associatedAccounts.map((account) => (
                        <li key={account.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                          <div>
                            <div className="font-medium">{account.accountName}</div>
                            <div className="text-sm text-gray-500">{account.accountID}</div>
                          </div>
                          <button
                            onClick={() => handleRemoveAccount(account.id)}
                            className="text-red-500 hover:text-red-700 text-sm ml-2"
                            type="button"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewUser;