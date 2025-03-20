
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would call an API
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, accept any email/password combo that looks valid
      if (email && email.includes('@') && password.length >= 6) {
        const newUser = {
          id: `user-${Date.now()}`,
          email,
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        toast({
          title: "Login successful",
          description: "Welcome back!"
        });
        
        return true;
      }
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password"
      });
      
      return false;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login"
      });
      
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // In a real app, this would call an API
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, accept any valid-looking signup
      if (email && email.includes('@') && password.length >= 6) {
        const newUser = {
          id: `user-${Date.now()}`,
          email,
          name
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        toast({
          title: "Account created",
          description: "Your account has been created successfully"
        });
        
        return true;
      }
      
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Please check your information and try again"
      });
      
      return false;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "An error occurred during signup"
      });
      
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
