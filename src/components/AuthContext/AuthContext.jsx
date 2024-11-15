import React, { createContext, useContext, useState } from 'react';
import { userData } from '../../data'; // Assuming you have userData imported

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    // Simulate authentication logic
    const user = userData.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
    }
    return user; // Return the user object or null if authentication fails
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
