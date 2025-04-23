import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import AuthService from '../../services/auth/AuthService';
import UnauthorizedPage from '../../pages/notfound/UnautharizePage';

export default function ProtectedRoute({ allowedRoles }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState('checking');
  const idleTimeout = 15 * 60 * 1000; // 15 minutes
  const refreshInterval = 600000; // 10 minutes in milliseconds
  const refreshTimer = useRef(null);
  const idleTimer = useRef(null);

  const logoutDueToInactivity = useCallback(async () => {
    await AuthService.logout();
    navigate('/', { replace: true });
  }, [navigate]);

  const refreshAuth = useCallback(async () => {
    try {
      await AuthService.refreshToken();
    } catch (error) {
      console.error('Token refresh failed:', error);
      await AuthService.logout();
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      if (!AuthService.isAuthenticated()) {
        navigate('/', {
          replace: true,
          state: {
            from: location,
            message: 'Please login to access this page',
          },
        });
        if (isMounted) setAuthStatus('unauthorized');
        return;
      }

      const userRole = AuthService.getCurrentUser()?.role;

      if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
        if (isMounted) setAuthStatus('unauthorized');
        return;
      }

      // Setup token refresh
      refreshTimer.current = setInterval(refreshAuth, refreshInterval);

      // Setup idle timeout
      const resetIdleTimer = () => {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(logoutDueToInactivity, idleTimeout);
      };

      const setupActivityListeners = () => {
        const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
        events.forEach((event) => window.addEventListener(event, resetIdleTimer));
        return () => events.forEach((event) => window.removeEventListener(event, resetIdleTimer));
      };

      resetIdleTimer();
      const cleanupListeners = setupActivityListeners();

      if (isMounted) setAuthStatus('authorized');

      return () => {
        cleanupListeners();
        clearTimeout(idleTimer.current);
        clearInterval(refreshTimer.current);
      };
    };

    checkAuth();

    return () => {
      isMounted = false;
      clearTimeout(idleTimer.current);
      clearInterval(refreshTimer.current);
    };
  }, [navigate, allowedRoles, location, logoutDueToInactivity, refreshAuth, idleTimeout]);

  switch (authStatus) {
    case 'checking':
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );

    case 'unauthorized':
      return <UnauthorizedPage attemptedPath={location.pathname} />;

    case 'authorized':
      return <Outlet />;

    default:
      return null;
  }
}