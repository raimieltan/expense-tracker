"use client";

import { Calculator3D } from '@/components/Calculator3D';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleSignupClick = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white to-blue-300">
 
      <div className="w-full h-[50vh] flex items-center justify-center">
        <Calculator3D />
      </div>

      {/* Text and Buttons */}
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Expenses Tracker App</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleLoginClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
