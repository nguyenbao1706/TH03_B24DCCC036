import React, { useState } from 'react';
import { Product, Category } from '../../../types';
import { useProducts } from '../../contexts/ProductContext';

interface Props { initial?: Partial<Product>; onSubmit: (p: Product) => void; }
export const ProductForm: React.FC<Props> = ({ initial = {}, onSubmit }) => {
  const { state } = useProducts();
  const [ten, setTen] = useState(initial.ten || '');
  const [danhMuc, setDanhMuc] = useState<Category | ''>((initial.danhMuc as Category) || '');
  const [gia, setGia] = useState(initial.gia !== undefined ? String(initial.gia) : '');
  const [soLuong, setSoLuong] = useState(initial.soLuong !== undefined ? String(initial.soLuong) : '');
  const [moTa, setMoTa] = useState(initial.moTa || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function nextId() {
    return state.products.length ? Math.max(...state.products.map(p => p.id)) + 1 : 1;
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!ten || ten.trim().length < 3) e.ten = 'Tên sản phẩm bắt buộc, tối thiểu 3 ký tự.';
    const g = Number(gia);
    if (gia === '' || Number.isNaN(g) || g <= 0) e.gia = 'Giá phải là số dương.';
    const s = Number(soLuong);
    if (soLuong === '' || !Number.isInteger(Number(soLuong)) || s < 0) e.soLuong = 'Số lượng phải là số nguyên không âm.';
    if (!danhMuc) e.danhMuc = 'Chọn danh mục.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const newProduct: Product = {
      id: (initial.id as number) || nextId(),
      ten: ten.trim(),
      danhMuc: danhMuc as Category,
      gia: Number(gia),
      soLuong: Number(soLuong),
      moTa: moTa.trim(),
    };
    onSubmit(newProduct);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="mb-3">
        <label className="block mb-1">Tên sản phẩm</label>
        <input value={ten} onChange={e => setTen(e.target.value)} className="border p-2 rounded w-full" />
        {errors.ten && <p className="text-red-600 text-sm">{errors.ten}</p>}
      </div>
      <div className="mb-3">
        <label className="block mb-1">Danh mục</label>
        <select value={danhMuc} onChange={e => setDanhMuc(e.target.value as Category)} className="border p-2 rounded w-full">
          <option value="">-- Chọn --</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
          <option value="Khác">Khác</option>
        </select>
        {errors.danhMuc && <p className="text-red-600 text-sm">{errors.danhMuc}</p>}
      </div>
      <div className="mb-3">
        <label className="block mb-1">Giá (VND)</label>
        <input value={gia} onChange={e => setGia(e.target.value)} type="number" className="border p-2 rounded w-full" />
        {errors.gia && <p className="text-red-600 text-sm">{errors.gia}</p>}
      </div>
      <div className="mb-3">
        <label className="block mb-1">Số lượng</label>
        <input value={soLuong} onChange={e => setSoLuong(e.target.value)} type="number" className="border p-2 rounded w-full" />
        {errors.soLuong && <p className="text-red-600 text-sm">{errors.soLuong}</p>}
      </div>
      <div className="mb-3">
        <label className="block mb-1">Mô tả</label>
        <textarea value={moTa} onChange={e => setMoTa(e.target.value)} className="border p-2 rounded w-full" />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">Lưu</button>
      </div>
    </form>
  );
};
