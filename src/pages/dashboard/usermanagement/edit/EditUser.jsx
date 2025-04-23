import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addUserFormConfig } from "../../../../../src/config/formconfig/AddUserFormConfig";
import UserService from "../../../../services/user/UserService";
import AccountService from "../../../../services/account/AccountService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoading } from "../../../../contexts/LoadingContext";
import { Pencil } from "lucide-react";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    accountIds: []
  });

  const [allAccounts, setAllAccounts] = useState([]);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [associatedAccounts, setAssociatedAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState({
    username: false,
    email: false,
    password: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();
        
        const userResponse = await UserService.getUserById(id);
        setFormData({
          username: userResponse.username,
          email: userResponse.email,
          role: userResponse.role,
          password: "",
          accountIds: userResponse.accounts?.map(acc => acc.id) || []
        });

        const accountsResponse = await AccountService.getAllAccounts();
        setAllAccounts(accountsResponse);

        const associated = accountsResponse.filter(acc => 
          userResponse.accounts?.some(userAcc => userAcc.id === acc.id)
        );
        const available = accountsResponse.filter(acc => 
          !userResponse.accounts?.some(userAcc => userAcc.id === acc.id)
        );

        setAssociatedAccounts(associated);
        setAvailableAccounts(available);
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
        navigate("/dashboard/users");
      } finally {
        hideLoading();
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountSelect = (accountId) => {
    const selectedAccount = availableAccounts.find(acc => acc.id === accountId);
    if (selectedAccount) {
      setAssociatedAccounts([...associatedAccounts, selectedAccount]);
      setAvailableAccounts(availableAccounts.filter(acc => acc.id !== accountId));
      setFormData(prev => ({
        ...prev,
        accountIds: [...prev.accountIds, accountId]
      }));
    }
  };

  const handleRemoveAccount = (accountId) => {
    const removedAccount = associatedAccounts.find(acc => acc.id === accountId);
    if (removedAccount) {
      setAvailableAccounts([...availableAccounts, removedAccount]);
      setAssociatedAccounts(associatedAccounts.filter(acc => acc.id !== accountId));
      setFormData(prev => ({
        ...prev,
        accountIds: prev.accountIds.filter(id => id !== accountId)
      }));
    }
  };

  const toggleFieldEdit = (field) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      showLoading();
      setIsEditing(true);
      
      const updateData = {
        username: formData.username,
        email: formData.email,
        role: formData.role,
        accountIds: formData.accountIds || [] 
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      await UserService.updateUser(id, updateData);
      toast.success("User updated successfully");
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
      setIsEditing(false);
      setEditableFields({
        username: false,
        email: false,
        password: false
      });
    }
  };

  const filteredAccounts = availableAccounts.filter((account) =>
    account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.accountID.includes(searchTerm)
  );

  const displayFields = addUserFormConfig.filter(field => 
    field.name !== 'accountIds'
  );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
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
      <div className="flex items-center text-sm text-gray-500">
        <Link to="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <Link to="/dashboard/users" className="hover:text-blue-600">
          User Management
        </Link>
        <span className="mx-2">/</span>
        <span>Edit User</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm mb-1 flex items-center justify-between">
                <span>
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </span>
                {['username', 'email', 'password'].includes(field.name) && (
                  <button
                    type="button"
                    onClick={() => toggleFieldEdit(field.name)}
                    className="text-blue-600 hover:text-blue-800 ml-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  className="w-full border rounded px-3 py-2"
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    className="w-full border rounded px-3 py-2"
                    placeholder={`Enter ${field.label}`}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    disabled={!editableFields[field.name] && ['username', 'email', 'password'].includes(field.name)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {formData.role === "CUSTOMER" && (
          <div className="border rounded-lg p-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manage Account Associations</h2>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => {
                  setAvailableAccounts(allAccounts);
                  setAssociatedAccounts([]);
                  setFormData(prev => ({ ...prev, accountIds: [] }));
                  setSearchTerm("");
                }}
              >
                Reset
              </button>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2 border-r pr-4">
                <div className="flex items-center mb-2">
                  <span className="text-blue-600 text-sm mr-2">Available Accounts</span>
                  <span className="text-gray-500 text-sm">({availableAccounts.length})</span>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Search by name or ID"
                    className="w-full border rounded px-2 py-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => (
                      <label key={account.id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={false}
                          onChange={() => handleAccountSelect(account.id)}
                          className="mr-2"
                        />
                        <div>
                          <div className="font-medium">{account.accountName}</div>
                          <div className="text-sm text-gray-500">ID: {account.accountID}</div>
                        </div>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-500 mt-2">No accounts found</p>
                  )}
                </div>
              </div>

              <div className="w-1/2 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600 text-sm">Associated Accounts</span>
                  <span className="text-gray-500 text-sm">({associatedAccounts.length})</span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {associatedAccounts.length === 0 ? (
                    <div className="text-center py-10">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="mt-2 text-gray-500">No Accounts Associated</p>
                      <p className="text-sm text-gray-400">Select accounts from the left panel</p>
                    </div>
                  ) : (
                    <ul>
                      {associatedAccounts.map((account) => (
                        <li key={account.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                          <div>
                            <div className="font-medium">{account.accountName}</div>
                            <div className="text-sm text-gray-500">ID: {account.accountID}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveAccount(account.id)}
                            className="text-red-500 hover:text-red-700 text-sm ml-2"
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

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/users")}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isEditing}
          >
            {isEditing ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
