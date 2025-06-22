import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'
import validateEmail from '../utils/validateEmail'

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' })
  const navigate = useNavigate()
  const { login } = useAuth()

  const onChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()

    if (!validateEmail(form.email)) {
      return toast.error('Please enter a valid email')
    }
    if (!form.password) {
      return toast.error('Password is required')
    }

    const promise = axios.post('/auth/login', form)
    toast.promise(promise, {
      loading: 'Logging in…',
      success: 'Welcome back! 😊',
      error: err =>
        err.response?.data?.msg || 'Login failed. Check your credentials.'
    })

    try {
      const res = await promise
      login(res.data.token)
      navigate('/')
    } catch {}
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Need an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
