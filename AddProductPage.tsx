import React from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { ProductForm } from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types';

export const AddProductPage: React.FC = () => {
  const { dispatch } = useProducts();
  const navigate = useNavigate();

  function handleAdd(p: Product) {
    dispatch({ type: 'add', payload: p });
    navigate('/');
  }

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm</h2>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
};
