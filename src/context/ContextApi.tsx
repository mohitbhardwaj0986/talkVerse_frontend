import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
  
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

const DataContext = createContext<DataContextType | undefined>(undefined);

const DataProvider = ({ children }: DataProviderProps) => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [userChatId, setUserChatId] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  // Load user from localStorage once on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("❌ Failed to parse userInfo:", err);
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
