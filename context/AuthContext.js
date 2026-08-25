"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { adminLogin } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("trukid_token");
    const savedAdmin = localStorage.getItem("trukid_admin");
    if (savedToken) setToken(savedToken);
    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
    setReady(true);
  }, []);

  async function login(email, password) {
    const data = await adminLogin(email, password);
    setToken(data.token);
    setAdmin(data.admin);
    localStorage.setItem("trukid_token", data.token);
    localStorage.setItem("trukid_admin", JSON.stringify(data.admin));
  }

  function logout() {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("trukid_token");
    localStorage.removeItem("trukid_admin");
  }

  return (
    <AuthContext.Provider value={{ token, admin, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
