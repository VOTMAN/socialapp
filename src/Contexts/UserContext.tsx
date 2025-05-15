"use client";

import { createContext, useState, useEffect } from "react";
import { authClient } from "@/utils/auth-client";

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const res = await authClient.getSession();
      if (res?.data) {
        setUser(res.data.user);
      }
    };
    
    loadSession();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  )
};