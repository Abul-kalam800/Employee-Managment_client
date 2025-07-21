import React from 'react';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
        <p className="mb-6 text-gray-600">
          Sorry, you don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
    );
};

export default Forbidden;