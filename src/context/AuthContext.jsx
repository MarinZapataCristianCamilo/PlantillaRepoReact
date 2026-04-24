import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const STORAGE_KEY = 'red-social-auth';
const USERS_STORAGE_KEY = 'red-social-users';

const loadUsers = () => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(USERS_STORAGE_KEY);
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const createUserProfile = (username, email) => {
  const trimmedName = username.trim();
  return {
    id: trimmedName.toLowerCase(),
    name: trimmedName,
    email,
    avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
    location: 'Ciudad de México',
    occupation: 'Estudiante',
    bio: 'Amante de las redes sociales y el diseño web.',
    joined: 'Abril 2024',
  };
};

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

    const users = loadUsers();
    const existingUser = users.find(
      (item) => item.username.toLowerCase() === trimmedName.toLowerCase()
    );

    if (!existingUser) {
      return { success: false, message: 'Usuario no encontrado. Regístrate primero.' };
    }

    if (existingUser.password !== password) {
      return { success: false, message: 'Contraseña incorrecta.' };
    }

    const profile = createUserProfile(existingUser.username, existingUser.email);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);

    return { success: true };
  };

  const register = (username, email, password, confirmPassword) => {
    const trimmedName = username.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      return { success: false, message: 'Completa todos los campos.' };
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Las contraseñas no coinciden.' };
    }

    if (password.length < 4) {
      return { success: false, message: 'La contraseña debe tener al menos 4 caracteres.' };
    }

    const users = loadUsers();
    if (
      users.some(
        (item) => item.username.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      return { success: false, message: 'El nombre de usuario ya existe.' };
    }

    if (
      users.some((item) => item.email.toLowerCase() === trimmedEmail.toLowerCase())
    ) {
      return { success: false, message: 'El correo ya está registrado.' };
    }

    const newUser = {
      username: trimmedName,
      email: trimmedEmail.toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    const profile = createUserProfile(newUser.username, newUser.email);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);

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
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
