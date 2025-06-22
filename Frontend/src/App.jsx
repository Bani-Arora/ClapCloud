import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Header from './components/Header'

import Signup from './pages/Signup'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './pages/Profile'

function Private({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/"       element={<Private><Feed/></Private>}/>
        <Route path="/profile"element={<Private><Profile/></Private>}/>
      </Routes>
    </>
  )
}
