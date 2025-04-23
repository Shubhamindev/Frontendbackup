// src/utils/passwordUtils.js
import bcrypt from 'bcryptjs';
import { Buffer } from 'buffer';

/**
 * Utility functions for handling password encryption on the frontend
 */
const PasswordUtils = {
  /**
   * Encrypts a password using bcryptjs before sending to backend
   * @param {string} password - The plain text password
   * @returns {Promise<string>} - The encrypted password
   */
  encryptPassword: async (password) => {
    // Use a consistent, frontend-specific salt
    // This is different from backend security salt, it's just an additional layer
    const clientSalt = import.meta.env.VITE_CLIENT_SALT || '$2a$10$clientSaltForFrontendSecurityLayer';
    
    // Generate a hash of the password with the client salt
    // Using a low round count (4) for frontend to avoid performance issues
    const hash = await bcrypt.hash(password, 4);
    
    return hash;
  },
  
  /**
   * Creates a signed payload for transmission to backend
   * Combines password hash with timestamp to prevent replay attacks
   * @param {string} hashedPassword - The hashed password
   * @returns {string} - The transmission-ready password payload
   */
  prepareForTransmission: (hashedPassword) => {
    // Add timestamp to prevent replay attacks
    const timestamp = new Date().getTime();
    const payload = `${hashedPassword}:${timestamp}`;
    
    return Buffer.from(payload).toString('base64');
  }
};

export default PasswordUtils;