import React from 'react';
import { Product } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface Props { product: Product; onDelete: (id: number) => void; }
export const ProductCard: React.FC<Props> = ({ product, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-lg">{product.ten}</h3>
        <p className="text-sm">{product.danhMuc} • Giá: {product.gia.toLocaleString()} VND</p>
        <p className="text-sm">Số lượng: {product.soLuong}</p>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => navigate(`/products/${product.id}`)} className="px-3 py-1 border rounded">Chi tiết</button>
        <button onClick={() => navigate(`/edit/${product.id}`)} className="px-3 py-1 border rounded">Sửa</button>
        <button onClick={() => { if (confirm('Xác nhận xóa sản phẩm này?')) onDelete(product.id); }} className="px-3 py-1 border rounded text-red-600">Xóa</button>
      </div>
    </div>
  );
};
