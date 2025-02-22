
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    // TODO: Replace with actual authentication logic
    const mockUser = {
      id: "1",
      email,
      name: "John Doe",
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    navigate("/profile");
  };

  const signup = async (email, password, name) => {
    // TODO: Replace with actual signup logic
    const mockUser = {
      id: "1",
      email,
      name,
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    navigate("/profile");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
