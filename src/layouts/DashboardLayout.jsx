import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import Footer from '../components/dashboard/Footer';
import AuthService from '../services/auth/AuthService';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { role } = AuthService.getCurrentUser();
    const currentPath = location.pathname;

    if (currentPath === '/dashboard') {
      switch(role) {
        case 'CUSTOMER':
          navigate('/dashboard/awsService', { replace: true });
          break;
        case 'ADMIN':
        case 'READ-ONLY':
          navigate('/dashboard/users', { replace: true });
          break;
        default:
          navigate('/dashboard/awsService', { replace: true });
      }
    }
  }, [navigate, location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 relative pt-16"> {/* Changed to pt-16 to account for header height */}
        {/* Sidebar */}
        <div 
          className={`transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-0'
          } fixed top-0 bottom-0 left-0 overflow-y-auto bg-white border-r border-gray-200`}
        >
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <main className={`flex-1 bg-gray-100 overflow-y-auto ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        } transition-all duration-300`}>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer className={sidebarOpen ? "ml-64" : "ml-0"} />
    </div>
  );
}