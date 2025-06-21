import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  loading: false
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (userData) => {
    try {
      setLoading(true);
      // 실제 로그인 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  // Context 값 메모이제이션
  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    loading
  }), [user, login, logout, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};