import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <header className="bg-sky-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Product Manager</Link>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/add" className="hover:underline">Add Product</Link>
      </nav>
    </div>
  </header>
);
