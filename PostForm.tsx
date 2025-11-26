import React, { useState } from "react";
import { Post } from "../types/Post";

interface Props {
  initial?: Partial<Post>;
  onSubmit: (p: Omit<Post, "id" | "date">) => void;
}

const categories = ["Công nghệ", "Ẩm thực", "Du lịch", "Đời sống", "Khác"];

const PostForm: React.FC<Props> = ({ initial, onSubmit }) => {
  const [title, setTitle] = useState(initial?.title || "");
  const [author, setAuthor] = useState(initial?.author || "");
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail || "");
  const [content, setContent] = useState(initial?.content || "");
  const [category, setCategory] = useState(initial?.category || "Khác");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length < 10) return alert("Tiêu đề ít nhất 10 ký tự");
    if (author.length < 3) return alert("Tác giả ít nhất 3 ký tự");
    if (content.length < 50) return alert("Nội dung ít nhất 50 ký tự");
    onSubmit({
      title,
      author,
      thumbnail:
        thumbnail || `https://picsum.photos/seed/${Math.random()}/800/400`,
      content,
      category,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-2xl mx-auto shadow p-6 rounded"
    >
      <h2 className="text-xl font-bold mb-4">Nhập thông tin bài viết</h2>
      <label>Tiêu đề</label>
      <input
        className="w-full border rounded px-3 py-2 mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Tác giả</label>
      <input
        className="w-full border rounded px-3 py-2 mb-3"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <label>Ảnh thumbnail (URL)</label>
      <input
        className="w-full border rounded px-3 py-2 mb-3"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />

      <label>Thể loại</label>
      <select
        className="w-full border rounded px-3 py-2 mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <label>Nội dung</label>
      <textarea
        className="w-full border rounded px-3 py-2 mb-3"
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="bg-sky-600 text-white px-4 py-2 rounded">
        Lưu bài viết
      </button>
    </form>
  );
};

export default PostForm;
