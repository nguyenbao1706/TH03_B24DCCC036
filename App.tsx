import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ProductProvider } from '../contexts/ProductContext';
import { Header } from './components/Header';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AddProductPage } from './pages/AddProductPage';
import { EditProductPage } from './pages/EditProductPage';

export default function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/add" element={<AddProductPage />} />
            <Route path="/edit/:id" element={<EditProductPage />} />
            <Route path="*" element={<div className="container p-4">404 - Trang không tìm thấy. <Link to="/">Quay lại</Link></div>} />
          </Routes>
        </div>
      </ProductProvider>
    </BrowserRouter>
  );
}
