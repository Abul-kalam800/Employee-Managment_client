import React from 'react';

import { Link } from 'react-router';
import '../../App.css';  // Import the CSS file

 const ErrorPage =()=> {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 fade-in">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or was moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
export default ErrorPage;
