import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser]   = useState(null);

  // fetch profile when token changes
  useEffect(() => {
    if (!token) return setUser(null);
    axios.get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setUser(r.data))
      .catch(() => { setToken(null); setUser(null); });
  }, [token]);

  const login = (tok) => {
    localStorage.setItem('token', tok);
    setToken(tok);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
