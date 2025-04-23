import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import AuthService from '../../services/auth/AuthService';

const ServerErrorPage = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      const user = AuthService.getCurrentUser();
      if (user?.role === 'ADMIN' || user?.role === 'READ-ONLY') {
        navigate('/dashboard/users');
      } else if (user?.role === 'CUSTOMER') {
        navigate('/dashboard/awsService');
      } else {
        navigate('/');
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="error" gutterBottom>
          Oops! Something Went Wrong
        </Typography>
        <Typography variant="h6" color="textSecondary" mb={3}>
          We're experiencing some technical difficulties. Please try again later.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Redirecting in...
        </Typography>
        <Typography variant="h2" color="error" fontWeight="bold" mb={3}>
          {countdown}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ px: 4, py: 1 }}
        >
          Go Back
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/500.png"
          alt="Server Error"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default ServerErrorPage;