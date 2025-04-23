import React from 'react';
import { ClipboardCopy } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ScrollCard = ({ content = '', className = '' }) => {
    const [hovered, setHovered] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy!');
    }
  };

  return (
    <div
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative w-full  rounded-lg shadow-inner border border-transparent bg-gray-100 hover:border-blue-500 transition cursor-pointer ${className}`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleCopy();
        }}
        className="absolute top-2 right-2 text-gray-600 hover:text-white bg-transparent hover:bg-blue-500 rounded-full p-1 transition"
        aria-label="Copy to clipboard"
      >
        <ClipboardCopy size={18} />
      </button>
      <pre className="overflow-auto max-h-64 whitespace-pre-wrap text-sm text-blue-600 bg-white p-3 rounded-lg w-full">
        {content}
      </pre>
      {hovered && (
        <div className="absolute -bottom-6 left-0 text-xs text-blue-600">
          Click Anywhere On The Card To Copy
        </div>
      )}
    </div>
  );
};

export default ScrollCard;
