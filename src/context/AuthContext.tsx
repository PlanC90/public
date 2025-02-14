import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';

interface AuthContextType {
  isAdmin: boolean;
  username: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  username: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useTelegram();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.username) {
      setIsAdmin(['PlanCTakomi', 'JosepH02722'].includes(user.username));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        username: user?.username || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);