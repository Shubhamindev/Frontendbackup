import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { userFormConfig } from "../../../config/formconfig/UserFromConfig";
import UserService from "../../../services/user/UserService";
import { getErrorMessage } from "../../../utils/errorHandler";
import { formatDate } from "../../../utils/formatDate";
import { useLoading } from "../../../contexts/LoadingContext";
import { useSelector } from "react-redux";
import Table from "../../../components/common/Table";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [usernameSortState, setUsernameSortState] = useState("all");
  const [roleSortState, setRoleSortState] = useState("all");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { role } = useSelector(state => state.auth); // Get user role from Redux
  const { showLoading, hideLoading } = useLoading();
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const PAGE_SIZE = 10; 

  const isReadOnly = role === "READ-ONLY"; 

  const fetchUsers = async (pageNumber = 1) => {
    try {
      setLoading(true);
      showLoading();
      const data = await UserService.getAllUsers(pageNumber);
  
      if (data.length < PAGE_SIZE) {
        setHasMoreUsers(false);
      }
  
      if (pageNumber === 1) {
        setUsers(data);
      } else {
        setUsers((prev) => [...prev, ...data]);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      hideLoading();
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleUsernameSort = () => {
    setUsernameSortState((prev) => (prev === "all" ? "asc" : "all"));
  };

  const handleRoleSort = () => {
    setRoleSortState((prev) => {
      if (prev === "all") return "ADMIN";
      if (prev === "ADMIN") return "CUSTOMER";
      if (prev === "CUSTOMER") return "READ-ONLY";
      return "all";
    });
  };

  const filteredUsers = [...users]
    .filter((user) => {
      if (roleSortState !== "all") return user.role === roleSortState;
      return true;
    })
    .sort((a, b) => {
      if (usernameSortState === "asc") {
        return a.username.localeCompare(b.username);
      }
      return 0;
    });

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && hasMoreUsers) {
      setPage((prev) => prev + 1);
    }
  };

  // Modify the form config to include handlers
  const tableFormConfig = userFormConfig.map(field => {
    if (field.name === "username") {
      return {
        ...field,
        sortHandler: handleUsernameSort
      };
    }
    if (field.name === "role") {
      return {
        ...field,
        sortHandler: handleRoleSort
      };
    }
    if (field.name === "lastLogin") {
      return {
        ...field,
        render: (item) => formatDate(item.lastLogin)
      };
    }
    if (field.type === "action") {
      return {
        ...field,
        render: (item) => {
          const Icon = field.icon;
          return !isReadOnly ? (
            <Link to={`/dashboard/users/edit/${item.userId}`}>
              <Icon className="h-4 w-4 text-blue-600 hover:text-blue-800 cursor-pointer" />
            </Link>
          ) : (
            <Icon 
              className="h-4 w-4 text-gray-400 cursor-not-allowed hover:text-gray-500" 
              title="Read-only users cannot edit users"
            />
          );
        }
      };
    }
    return field;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        {!isReadOnly ? (
          <Link
            to="/dashboard/user-management/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Link>
        ) : (
          <div 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md cursor-not-allowed hover:bg-gray-500 transition"
            title="Read-only users cannot add new users"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span>User Management</span>
        </div>

        {/* Using the Table component */}
        <div 
          onScroll={handleScroll}
          className="max-h-[500px]"
        >
          <Table 
            formConfig={tableFormConfig}
            data={filteredUsers}
            emptyMessage={error || "No users found. Add a user to get started."}
          />
          
          {loading && (
            <div className="text-center py-4 text-gray-500">Loading more users...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;