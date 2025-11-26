import React from 'react';

interface Props { total: number; perPage: number; current: number; setCurrent: (n: number) => void; }
export const Pagination: React.FC<Props> = ({ total, perPage, current, setCurrent }) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-3">
      <button disabled={current === 1} onClick={() => setCurrent(current - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>
      <div className="flex gap-1">
        {pages.map(p => (
          <button key={p} onClick={() => setCurrent(p)} className={`px-3 py-1 border rounded ${p === current ? 'bg-sky-600 text-white' : ''}`}>{p}</button>
        ))}
      </div>
      <button disabled={current === totalPages} onClick={() => setCurrent(current + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      <div className="ml-4">Tổng sản phẩm: {total} | Trang {current} / {totalPages}</div>
    </div>
  );
};
