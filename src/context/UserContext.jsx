import { createContext, useContext, useMemo } from 'react';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { user } = useContext(AuthContext);

  const profile = useMemo(
    () =>
      user
        ? {
            ...user,
            followers: 345,
            friends: 128,
            posts: 18,
          }
        : null,
    [user]
  );

  return <UserContext.Provider value={{ profile }}>{children}</UserContext.Provider>;
}
