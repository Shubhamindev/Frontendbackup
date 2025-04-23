import React, { useState, useEffect } from 'react';
import AwsService from '../../../../services/aws/AwsService';
import { useLoading } from '../../../../contexts/LoadingContext';
import { getErrorMessage } from '../../../../utils/errorHandler';
import Table from '../Table';

const RDSDashboard = ({ accountId }) => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (accountId) {
      fetchRDSInstances(accountId);
    }
  }, [accountId]);

  const fetchRDSInstances = async (accountId) => {
    if (!accountId) return;
    
    try {
      setLoading(true);
      showLoading();
      
      const data = await AwsService.getRdsInstances(accountId);
      const flatData = Array.isArray(data) ? data.flat() : [];

      
      setInstances(flatData|| []);
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
    { name: 'engine', label: 'ENGINE' },
    { name: 'region', label: 'REGION' },
    { name: 'status', label: 'STATUS' }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">RDS Instances</h2>
      <Table
        formConfig={formConfig}
        data={instances}
        loading={loading}
        error={error}
        onRetry={() => fetchRDSInstances(accountId)}
        emptyMessage="No RDS instances found"
      />
    </div>
  );
};

export default RDSDashboard;