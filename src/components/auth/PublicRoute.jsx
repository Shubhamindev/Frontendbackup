import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
 import AuthService from '../../services/auth/AuthService'; 

export default function PublicRoute() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate('/dashboard/users', { replace: true });
    }
  }, [navigate]);
  
  return !AuthService.isAuthenticated() ? <Outlet /> : null;
}