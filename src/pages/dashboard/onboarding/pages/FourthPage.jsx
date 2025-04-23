import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import OnBoarding from "../OnBoarding";

const FourthPage = () => {
  const tickRef = useRef(null);
  
  useEffect(() => {
    const tickElement = tickRef.current;
    if (!tickElement) return;
    
    let position = 0;
    let direction = 1;
    const animationSpeed = 0.5;
    const animationRange = 10; 
    
    const animate = () => {
      if (!tickElement) return;
      
      position += animationSpeed * direction;
      
      if (position >= animationRange) {
        position = animationRange;
        direction = -1;
      } else if (position <= 0) {
        position = 0;
        direction = 1;
      }
      
      tickElement.style.transform = `translateY(-${position}px)`;
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center ">
      <div className="w-full  flex flex-col items-center text-center">
        <div className="mb-8" ref={tickRef}>
          <img 
            src="/onboarding/tick.svg" 
            alt="Success" 
            className="w-20 h-20"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Thank You For CUR Access!
        </h1>
        
        <p className="text-gray-600 mb-8">
          If you have additional accounts to onboard, please click <Link to="/dashboard/onboarding" className="text-blue-600 font-medium hover:underline">Onboard</Link> to proceed.
        </p>

        <div className="flex justify-center mt-4">
          <Link to="/dashboard">
            <button className="px-8 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FourthPage;