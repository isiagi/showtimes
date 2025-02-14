/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | any>(null);
  const [tokens, setTokens] = useState<any>({
    access_token: "",
    refresh_token: "",
  });

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Initialize tokens from localStorage after component mounts
  useEffect(() => {
    setTokens({
      access_token: window.localStorage.getItem("access_token"),
      refresh_token: window.localStorage.getItem("refresh_token"),
    });
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock login. In a real app, you'd validate credentials with your backend.
    // if (email === "user@example.com" && password === "password") {
    //   const user = { email }
    //   setUser(user)
    //   localStorage.setItem("user", JSON.stringify(user))
    // } else {
    //   throw new Error("Invalid credentials")
    // }
    try {
      const response = await fetch("http://localhost:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const user = { refreshToken: data.refresh_token };
        setUser(user);
        // set access_token and refresh_token in localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    // setUser(null);
    // localStorage.removeItem("user");
    // await axios.post(
    //   "https://cinema-vmbf.onrender.com/auth/logout/",
    //   { refresh: tokens.refresh_token },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${tokens.access_token}`,
    //     },
    //   }
    // );
    try {
      const response = fetch("http://localhost:8000/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access_token}`,
        },
        body: JSON.stringify({ refresh: tokens.refresh_token }),
      });
      console.log(response);

      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
