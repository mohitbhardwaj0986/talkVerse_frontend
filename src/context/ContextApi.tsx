import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

// Define types for context
interface DataContextType {
  chatId: string | null;
  setChatId: React.Dispatch<React.SetStateAction<string | null>>;

  userChatId: string | null;
  setUserChatId: React.Dispatch<React.SetStateAction<string | null>>;

  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

interface DataProviderProps {
  children: ReactNode;
}

interface UserData {
  userId: string;
  email: string;
  userName: string;
}

interface DecodedToken {
  _id: string;
  email: string;
  userName: string;
  exp?: number; // optional expiry
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider = ({ children }: DataProviderProps) => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [userChatId, setUserChatId] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  // Helper to read cookie
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  // Decode token once when provider mounts
  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const userData: UserData = {
          userId: decoded._id,
          email: decoded.email,
          userName: decoded.userName,
        };

        setUser(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
      } catch (err) {
        console.error("❌ Invalid token:", err);
        setUser(null);
        localStorage.removeItem("userInfo");
      }
    }
  }, []);

  const value: DataContextType = {
    chatId,
    setChatId,
    userChatId,
    setUserChatId,
    user,
    setUser,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("❌ useData must be used within a DataProvider");
  }
  return context;
};

export { DataProvider, useData };
