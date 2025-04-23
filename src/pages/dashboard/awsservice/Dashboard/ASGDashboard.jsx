import React, { useState, useEffect } from "react";
import AwsService from "../../../../services/aws/AwsService";
import { useLoading } from "../../../../contexts/LoadingContext";
import { getErrorMessage } from "../../../../utils/errorHandler";
import Table from "../Table";

const ASGDashboard = ({ accountId }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (accountId) {
      fetchAutoScalingGroups(accountId);
    }
  }, [accountId]);

  const fetchAutoScalingGroups = async (accountId) => {
    if (!accountId) return;

    try {
      setLoading(true);
      showLoading();

      const data = await AwsService.getAutoScalingGroups(accountId);
      const flatData = Array.isArray(data) ? data.flat() : [];

      setGroups(flatData || []);
      setError("");
    } catch (err) {
      setError(getErrorMessage(err));
      setGroups([]);
    } finally {
      setLoading(false);
      hideLoading();
    }
  };

  const formConfig = [
    { name: "resourceId", label: "RESOURCE ID" },
    { name: "resourceName", label: "NAME" },
    {
      name: "desiredCapacity",
      label: "DESIRED CAPACITY",
      render: (item) => <span>{item.desiredCapacity || "0"}</span>,
    },
    {
      name: "minSize",
      label: "MIN SIZE",
      render: (item) => <span>{item.minSize || "0"}</span>,
    },
    {
      name: "maxSize",
      label: "MAX SIZE",
      render: (item) => <span>{item.maxSize || "0"}</span>,
    },
    { name: "status", label: "STATUS" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Auto Scaling Groups</h2>
      <Table
        formConfig={formConfig}
        data={groups}
        loading={loading}
        error={error}
        onRetry={() => fetchAutoScalingGroups(accountId)}
        emptyMessage="No Auto Scaling Groups found"
      />
    </div>
  );
};

export default ASGDashboard;
