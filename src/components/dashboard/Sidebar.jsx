import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();
  const { role } = useSelector(state => state.auth);

  const allMenuItems = [
    { 
      image: '/management.png',
      label: 'Users Management', 
      path: '/dashboard/users', 
      roles: ['ADMIN', 'READ-ONLY'] 
    },
    { 
      image: '/onboarding.png',
      label: 'On Boarding', 
      path: '/dashboard/onboarding', 
      roles: ['ADMIN'] 
    },
    { 
      image: '/aws.svg',
      label: 'Aws Service', 
      path: '/dashboard/awsService', 
      roles: ['ADMIN', 'READ-ONLY', 'CUSTOMER'] 
    },
    { 
      image: '/cost.svg',
      label: 'Cost Explorer', 
      path: '/dashboard/costexplorer', 
      roles: ['ADMIN', 'READ-ONLY', 'CUSTOMER'] 
    },
  ];

  const menuItems = allMenuItems.filter(item => 
    item.roles.includes(role)
  );

  return (
    <aside className="w-64 py-12 bg-white border-r border-gray-200">
      <nav className="mt-5 px-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 mt-2 text-gray-600 rounded-lg hover:bg-gray-100 ${
                isActive ? 'bg-gray-100' : ''
              }`}
              style={{ textDecoration: 'none' }}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                isActive ? 'bg-blue-500' : 'bg-gray-200'
              }`}>
                <img 
                  src={item.image} 
                  alt={item.label} 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="mx-4">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
