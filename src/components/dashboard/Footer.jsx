import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6  w-full mt-auto sticky bottom-0">
      <div className="flex justify-between items-center px-6 text-sm text-gray-600">
        <p>CloudKeeper 2025 | All Rights Reserved</p>
        <a href="/contact" className="hover:underline">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
