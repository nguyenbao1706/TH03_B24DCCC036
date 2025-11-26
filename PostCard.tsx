import React from "react";
import { Post } from "../types/Post";
import { useNavigate } from "react-router-dom";

interface Props {
  post: Post;
  onDelete: (id: string) => void;
}

const PostCard: React.FC<Props> = ({ post, onDelete }) => {
  const nav = useNavigate();

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-3">{post.title}</h3>
      <p className="text-sm text-gray-500">
        {post.author} • {post.date}
      </p>
      <p className="mt-2 text-gray-700 line-clamp-2">{post.content}</p>
      <div className="mt-3 flex gap-3">
        <button
          className="text-sky-600"
          onClick={() => nav(`/posts/${post.id}`)}
        >
          Đọc thêm
        </button>
        <button
          className="text-yellow-600"
          onClick={() => nav(`/edit/${post.id}`)}
        >
          Sửa
        </button>
        <button
          className="text-red-600"
          onClick={() => {
            if (confirm("Bạn có chắc muốn xóa bài viết này?"))
              onDelete(post.id);
          }}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default PostCard;
