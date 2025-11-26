import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pid = Number(id);
  const { state, dispatch } = useProducts();
  const navigate = useNavigate();
  const product = state.products.find(p => p.id === pid);
  if (!product) return <div className="container p-4">Sản phẩm không tìm thấy. <button onClick={() => navigate('/')} className="underline">Quay lại</button></div>;

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold mb-2">{product.ten}</h2>
      <p>Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia.toLocaleString()} VND</p>
      <p>Số lượng: {product.soLuong}</p>
      <p className="mt-2">Mô tả: {product.moTa}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => navigate(`/edit/${product.id}`)} className="px-3 py-1 border rounded">Sửa</button>
        <button onClick={() => { if (confirm('Xác nhận xóa?')) { dispatch({ type: 'delete', payload: product.id }); navigate('/'); } }} className="px-3 py-1 border rounded text-red-600">Xóa</button>
        <button onClick={() => navigate('/')} className="px-3 py-1 border rounded">Quay lại</button>
      </div>
    </div>
  );
};
