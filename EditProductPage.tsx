import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import {ProductForm } from  '../components/ProductForm';
import type { Product } from '../../../types';   

export const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pid = Number(id);
  const { state, dispatch } = useProducts();
  const navigate = useNavigate();

  const product = state.products.find(p => p.id === pid);

  if (!product) return (
    <div className="container p-4">
      Sản phẩm không tìm thấy.
      <button onClick={() => navigate('/')}>Trở về</button>
    </div>
  );

  function handleUpdate(p: Product) {
    dispatch({ type: 'update', payload: p });
    navigate(`/products/${p.id}`);
  }

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
      <ProductForm initial={product} onSubmit={handleUpdate} />
    </div>
  );
};
