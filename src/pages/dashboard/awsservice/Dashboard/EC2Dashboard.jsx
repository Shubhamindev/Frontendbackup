import React, { useState, useEffect } from 'react';
import AwsService from '../../../../services/aws/AwsService';
import { useLoading } from '../../../../contexts/LoadingContext';
import { getErrorMessage } from '../../../../utils/errorHandler';
import Table from '../Table';

const EC2Dashboard = ({ accountId }) => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (accountId) {
      fetchEC2Instances(accountId);
    }
  }, [accountId]);

  const fetchEC2Instances = async (accountId) => {
    if (!accountId) return;
  
    try {
      setLoading(true);
      showLoading();
  
      const data = await AwsService.getEC2Instances(accountId);
      const flatData = Array.isArray(data) ? data.flat() : [];
      setInstances(flatData);
      setError('');
    } catch (err) {
      setError(getErrorMessage(err));
      setInstances([]);
    } finally {
      setLoading(false);
      hideLoading();
    }
  };

  const formConfig = [
    { name: 'resourceId', label: 'RESOURCE ID' },
    { name: 'resourceName', label: 'NAME' },
    { name: 'status', label: 'STATUS' },
    { name: 'region', label: 'REGION' }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">EC2 Instances</h2>
      <Table
        formConfig={formConfig}
        data={instances}
        loading={loading}
        error={error}
        onRetry={() => fetchEC2Instances(accountId)}
        emptyMessage="No EC2 instances found"
      />
    </div>
  );
};

export default EC2Dashboard;