import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/page";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserManagement from "./pages/dashboard/usermanagement/UserManagement";
import AddNewUser from "./pages/dashboard/usermanagement/add/AddNewUser";
import EditUser from "./pages/dashboard/usermanagement/edit/EditUser";
import AwsService from "./pages/dashboard/awsservice/AWSService";
import CostExplorer from "./pages/dashboard/costexplorer/CostExplorer";
import OnBoarding from "./pages/dashboard/onboarding/OnBoarding";
import NotFoundPage from "./pages/notfound/NotFoundPage";
import { ToastContainer } from "react-toastify";
import UnauthorizedPage from "./pages/notfound/UnautharizePage";
import ServerErrorPage from "./pages/notfound/ServerErrorPage";

function App() {
  return (
    <Router>
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
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/404" element={<h1>not found</h1>} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/500" element={<ServerErrorPage />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "READ-ONLY", "CUSTOMER"]} />
          }
        >
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Common routes for all roles */}
            <Route path="awsService" element={<AwsService />} />
            <Route path="costexplorer" element={<CostExplorer />} />

            {/* Admin/Read-only routes */}
            <Route
              element={<ProtectedRoute allowedRoles={["ADMIN", "READ-ONLY"]} />}
            >
              <Route path="users" element={<UserManagement />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="onboarding" element={<OnBoarding />} />
            </Route>

            {/* Admin-only routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="user-management/create" element={<AddNewUser />} />
              <Route path="users/edit/:id" element={<EditUser />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
