import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import FormConfig from '../../config/formconfig/FormConfig';
import authService from '../../services/auth/AuthService';
import { useLoading } from '../../contexts/LoadingContext';

import {
  TextField,
  Button,
  Typography,
  Link,
  Box
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState(
    FormConfig.login.fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {})
  );

  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    
    try {
        await authService.login(formData.email, formData.password);
        toast.success('Login successful!');
        setTimeout(() => {
            navigate('/dashboard');
        }, 500); 
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        toast.error(errorMessage);
    } finally {
        hideLoading();
    }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
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

      <Box className="w-full max-w-md p-8 space-y-6 rounded-md bg-white">
        <div className="flex justify-center mb-8">
          <img 
            src="/logo.png" 
            alt="CloudKeeper Logo" 
            className="h-16 w-auto"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Typography variant="body1" component="label" className="block text-gray-600 mb-1">
                Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                size="small"
                placeholder="Enter your email"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                  },
                }}
              />
            </div>

            <div>
              <Typography variant="body1" component="label" className="block text-gray-600 mb-1">
                Password
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                size="small"
                placeholder="Enter your password"
                autoComplete="current-password"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                  },
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link 
              href="/forgot-password" 
              variant="body2" 
              className="text-blue-500 hover:text-blue-600 text-sm no-underline"
              sx={{ textDecoration: 'none' }}
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-[#3EA1E3] hover:bg-[#3EA1E3]/90"
            sx={{
              textTransform: 'uppercase',
              padding: '8px 0',
              borderRadius: '4px',
              insetBlockStart: '16px',
              bgcolor: '#3EA1E3',
              '&:hover': {
                bgcolor: '#3EA1E3cc',
              },
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}
          >
            LOGIN
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;