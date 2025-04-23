import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import AccountService from '../../../services/account/AccountService';
import { useLoading } from '../../../contexts/LoadingContext';
import { getErrorMessage } from '../../../utils/errorHandler';

const AccountSelector = ({ onAccountSelect, selectedAccountID }) => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      showLoading();
      const accountsData = await AccountService.getAllAccounts();
      setAccounts(accountsData);
      setFilteredAccounts(accountsData);

      // Auto-select first accountID if none selected
      if (accountsData.length > 0 && !selectedAccountID) {
        onAccountSelect(accountsData[0].accountID);
      }

      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      hideLoading();
    }
  };

  const selectedAccountData = useMemo(() => {
    return accounts.find(acc => acc.accountID === selectedAccountID) || null;
  }, [accounts, selectedAccountID]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredAccounts(accounts);
      return;
    }

    const results = accounts.filter(account =>
      account.accountName.toLowerCase().includes(value.toLowerCase()) ||
      account.accountID.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredAccounts(results);
  };

  const handleAccountSelect = (accountID) => {
    onAccountSelect(accountID);
    setIsDropdownOpen(false);
    setSearchTerm('');
    setFilteredAccounts(accounts);
  };

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Loading accounts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">
        <p>Error loading accounts: {error}</p>
        <button
          onClick={fetchAccounts}
          className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <h2 className="text-sm font-medium text-gray-700 mb-2">Active Account</h2>

      {selectedAccountData && (
        <div
          className="border border-gray-300 bg-white rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:border-blue-500 shadow-sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{selectedAccountData.accountName}</span>
            <span className="text-xs text-gray-500">ID: {selectedAccountData.accountID}</span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </div>
      )}

      {isDropdownOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
          <div className="p-2 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search accounts..."
                className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredAccounts.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No matching accounts found</div>
            ) : (
              <ul className="py-1">
                {filteredAccounts.map(account => (
                  <li
                    key={account.accountID}
                    onClick={() => handleAccountSelect(account.accountID)}
                    className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                      selectedAccountID === account.accountID ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{account.accountName}</span>
                      <span className="text-xs text-gray-500">ID: {account.accountID}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSelector;