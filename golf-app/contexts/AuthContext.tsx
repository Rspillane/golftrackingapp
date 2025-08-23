// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for stored auth token
    // In a real app, you'd check AsyncStorage or SecureStore
    const checkAuthStatus = async () => {
      try {
        // const token = await SecureStore.getItemAsync('authToken');
        // setIsAuthenticated(!!token);
        setIsAuthenticated(false); // Default to logged out for now
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    // In a real app, you'd make an API call here
    // const response = await loginAPI(email, password);
    // await SecureStore.setItemAsync('authToken', response.token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    // In a real app, you'd clear the stored token
    // await SecureStore.deleteItemAsync('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
