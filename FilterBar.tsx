import React from 'react';

interface Props {
  category: string; setCategory: (c: string) => void;
  min: string; setMin: (v: string) => void;
  max: string; setMax: (v: string) => void;
}
export const FilterBar: React.FC<Props> = ({ category, setCategory, min, setMin, max, setMax }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
    <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
      <option value="">Tất cả danh mục</option>
      <option value="Điện tử">Điện tử</option>
      <option value="Quần áo">Quần áo</option>
      <option value="Đồ ăn">Đồ ăn</option>
      <option value="Sách">Sách</option>
      <option value="Khác">Khác</option>
    </select>
    <input type="number" className="border p-2 rounded" placeholder="Giá min" value={min} onChange={e => setMin(e.target.value)} />
    <input type="number" className="border p-2 rounded" placeholder="Giá max" value={max} onChange={e => setMax(e.target.value)} />
    <div className="flex items-center gap-2">
      <button onClick={() => { setCategory(''); setMin(''); setMax(''); }} className="px-3 py-2 border rounded">Reset</button>
    </div>
  </div>
);
