import { useAuth } from '../context/AuthContext';
import axios       from '../api/axios';
import { toast }   from 'react-hot-toast';
import { Trash2 }  from 'lucide-react';

export default function PostCard({ post, fetchPosts }) {
  const { token, user } = useAuth();

  const clap = async () => {
    try {
      await axios.post(`/posts/clap/${post._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch {
      toast.error('Couldn’t clap');
    }
  };

  const deletePost = async () => {
    if (!confirm('Delete this post?')) return;

    try {
      await axios.delete(`/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Post deleted');
      fetchPosts();
    } catch {
      toast.error('Delete failed');
    }
  };

  const isOwner = user?._id === post.user._id;

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      {/* header: avatar, name, time, (delete) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img
            src={post.user.avatar || '/default-avatar.png'}
            alt=""
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{post.user.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {isOwner && (
          <button onClick={deletePost} className="p-1 hover:bg-gray-100 rounded-full">
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        )}
      </div>

      {/* content */}
      <p className="text-gray-700 mb-3">{post.content}</p>

      {/* image (if any) */}
      {post.image && (
        <img
          src={post.image}
          alt=""
          className="w-full max-h-80 object-cover rounded-lg mb-3"
        />
      )}

      {/* clap button */}
      <div className="flex items-center space-x-4 text-gray-600">
        <button
          onClick={clap}
          className="flex items-center space-x-1 hover:text-gray-800 transition"
        >
          <span className="text-lg">👏</span>
          <span>{post.claps}</span>
        </button>
      </div>
    </div>
  );
}
