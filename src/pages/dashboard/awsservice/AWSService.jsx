import React, { useState,  } from 'react';
import { Copy, Funnel } from 'lucide-react';
import EC2Dashboard from './Dashboard/EC2Dashboard';
import RDSDashboard from './Dashboard/RDSDashboard';
import ASGDashboard from './Dashboard/ASGDashboard';
import AccountSelector from './AccountSelector';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AWSService = () => {
  const [selectedAccountID, setSelectedAccountID] = useState(null);
  const [activeTab, setActiveTab] = useState('ec2');

  // No localStorage useEffect hooks - state will reset when navigating away

  const tabs = [
    { id: 'ec2', label: 'EC2' },
    { id: 'rds', label: 'RDS' },
    { id: 'asg', label: 'ASG' },
  ];

  return (
    <div className="p-6">
      <div className="bg-white border rounded-xl shadow-lg">
        {/* Top header with horizontal tabs and account selector */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          {/* Horizontal Tabs - Ladder Style */}
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 text-sm font-medium transition rounded-md ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Account Selector */}
          <div className="w-64">
            <AccountSelector
              onAccountSelect={(id) => setSelectedAccountID(id)}
              selectedAccountID={selectedAccountID}
            />
          </div>
        </div>

        {/* Dynamic Dashboard Content */}
        <div className="p-6 min-h-[500px]">
          {!selectedAccountID ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              Please select an account
            </div>
          ) : activeTab === 'ec2' ? (
            <EC2Dashboard accountId={selectedAccountID} />
          ) : activeTab === 'rds' ? (
            <RDSDashboard accountId={selectedAccountID} />
          ) : (
            <ASGDashboard accountId={selectedAccountID} />
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AWSService;