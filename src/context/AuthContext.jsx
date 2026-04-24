import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const STORAGE_KEY = 'red-social-auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (username, password) => {
    const trimmedName = username.trim();
    if (!trimmedName || !password) {
      return { success: false, message: 'Ingresa usuario y contraseña.' };
    }

    const newUser = {
      id: trimmedName.toLowerCase(),
      name: trimmedName,
      email: `${trimmedName.toLowerCase()}@redsocial.com`,
      avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
      location: 'Ciudad de México',
      occupation: 'Estudiante',
      bio: 'Amante de las redes sociales y el diseño web.',
      joined: 'Abril 2024',
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
