import React from 'react';

interface Props { value: string; onChange: (v: string) => void; }
export const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <input className="border p-2 rounded w-full" placeholder="Tìm kiếm theo tên..." value={value} onChange={e => onChange(e.target.value)} />
);
