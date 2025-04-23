import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import AuthService from '../../services/auth/AuthService';

const NotFoundPage = () => {
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
                navigate('dashboard/awsService');
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
                p: 4
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
                <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                    Oops! Page Not Found
                </Typography>
                <Typography variant="h6" color="textSecondary" mb={3}>
                    The page you are looking for doesn’t exist or has been moved.
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Redirecting in...
                </Typography>
                <Typography variant="h2" color="primary" fontWeight="bold">
                    {countdown}
                </Typography>
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
                    src="/404.png"
                    alt="Not Found"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            </Box>
        </Box>
    );
};

export default NotFoundPage;
