import { useState, useEffect } from 'react'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'

export default function Profile() {
  const { user, token, logout } = useAuth()
  const [form, setForm]         = useState({ name:'', bio:'', avatar:'' })
  const [avatarFile, setAvatarFile]     = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')

  
  useEffect(() => {
    if (user) {
      setForm({ name: user.name, bio: user.bio, avatar: user.avatar })
      setAvatarPreview(user.avatar)       // show existing avatar
    }
  }, [user])

  // Update preview when a new file is chosen
  useEffect(() => {
    if (!avatarFile) return
    const url = URL.createObjectURL(avatarFile)
    setAvatarPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [avatarFile])

  const onSave = async () => {
    try {
      // 1) update name/bio
      await axios.put('/users/me',
        { name: form.name, bio: form.bio },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // 2) upload avatar if changed
      if (avatarFile) {
        const data = new FormData()
        data.append('image', avatarFile)
        const res = await axios.post('/users/me/avatar', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        
        setForm(prev => ({ ...prev, avatar: res.data.avatar }))
      }

      toast.success('Profile updated!')
    } catch {
      toast.error('Update failed')
    }
  }

  return (
    <div className="flex justify-center mt-8 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>

        {/* Avatar upload & preview */}
        <label htmlFor="avatarInput" className="block mb-4 cursor-pointer">
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={e => setAvatarFile(e.target.files[0] || null)}
            className="hidden"
          />
          <div className="w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-full overflow-hidden flex items-center justify-center hover:border-gray-400 transition">
            {avatarPreview
              ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover"/>
              : <span className="text-gray-400">Upload<br/>Photo</span>
            }
          </div>
        </label>

        {/* Name & Bio */}
        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            placeholder="Name"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <textarea
            name="bio"
            value={form.bio}
            onChange={e => setForm({...form, bio: e.target.value})}
            placeholder="Bio"
            rows={3}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
          />
        </div>

        {/* Actions */}
        <button
          onClick={onSave}
          className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
        >
          Save Changes
        </button>
        <button
          onClick={logout}
          className="w-full mt-2 py-3 bg-red-400 text-white rounded-lg shadow hover:bg-red-500 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}
