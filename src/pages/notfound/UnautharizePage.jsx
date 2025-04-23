import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const UnauthorizedPage = ({ attemptedPath }) => {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        const timeout = setTimeout(() => {
            navigate(-1); // or navigate('/dashboard') depending on your preference
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
                    Access Denied
                </Typography>

                <Typography variant="h6" color="textSecondary" mb={3}>
                    You don’t have permission to access this page:
                </Typography>

                <Typography variant="body1" fontFamily="monospace" mb={3}>
                    {attemptedPath || 'Unknown path'}
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
                    src="/forbidden.png"
                    alt="Unauthorized"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            </Box>
        </Box>
    );
};

export default UnauthorizedPage;
