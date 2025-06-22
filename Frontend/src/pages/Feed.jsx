import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'
import PostCard from '../components/PostCard'

export default function Feed() {
  const { token }             = useAuth()
  const [posts, setPosts]     = useState([])
  const [content, setContent] = useState('')
  const [file, setFile]       = useState(null)
  const [filePreview, setFilePreview] = useState('')


  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/posts')
      setPosts(res.data)
    } catch {
      toast.error('Failed to load posts')
    }
  }

  
  useEffect(() => {
    if (!file) return setFilePreview('')
    const url = URL.createObjectURL(file)
    setFilePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const onPost = async () => {
    if (!content.trim() && !file) {
      return toast.error('Add text or an image')
    }
    try {
      const data = new FormData()
      data.append('content', content)
      if (file) data.append('image', file)

      await axios.post('/posts', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      setContent('')
      setFile(null)
      toast.success('Posted!')
      fetchPosts()
    } catch {
      toast.error('Post failed')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        {/* Text area */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What’s happening?"
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none h-24"
        />

        {/* Image upload & preview */}
        <label htmlFor="postImageInput" className="block mt-4 mb-2 cursor-pointer">
          <input
            id="postImageInput"
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0] || null)}
            className="hidden"
          />
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition">
            {filePreview
              ? <img src={filePreview} alt="preview" className="max-h-48 object-contain rounded" />
              : <span className="text-gray-400">Click to add image</span>
            }
          </div>
        </label>

        {/* Post button */}
        <div className="flex justify-end">
          <button
            onClick={onPost}
            className="px-5 py-2 bg-blue-500 text-white rounded-full font-semibold shadow hover:bg-blue-600 transition"
          >
            Post
          </button>
        </div>
      </div>

      {/* Render feed */}
      {posts.map(p => (
        <PostCard key={p._id} post={p} fetchPosts={fetchPosts}/>
      ))}
    </div>
  )
}
