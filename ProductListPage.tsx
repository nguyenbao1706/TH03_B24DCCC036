import React, { useEffect, useMemo, useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { Link } from 'react-router-dom';

export const ProductListPage: React.FC = () => {
  const { state, dispatch } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => setPage(1), [search, category, min, max]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return state.products.filter(p => {
      if (s && !p.ten.toLowerCase().includes(s)) return false;
      if (category && p.danhMuc !== category) return false;
      if (min) { const nv = Number(min); if (!Number.isNaN(nv) && p.gia < nv) return false; }
      if (max) { const nv = Number(max); if (!Number.isNaN(nv) && p.gia > nv) return false; }
      return true;
    });
  }, [state.products, search, category, min, max]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  function handleDelete(id: number) { dispatch({ type: 'delete', payload: id }); }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2"><SearchBar value={search} onChange={setSearch} /></div>
        <div className="flex justify-end"><Link to="/add" className="px-4 py-2 bg-green-500 text-white rounded">Thêm sản phẩm</Link></div>
      </div>

      <div className="mb-4"><FilterBar category={category} setCategory={setCategory} min={min} setMin={setMin} max={max} setMax={setMax} /></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paged.map(p => <ProductCard key={p.id} product={p} onDelete={handleDelete} />)}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Pagination total={total} perPage={perPage} current={currentPage} setCurrent={setPage} />
      </div>
    </div>
  );
};
