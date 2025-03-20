
import React from 'react';
import PatientForm from '@/components/PatientForm';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Index = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-4xl mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <span className="font-medium">Welcome, {user?.name || user?.email}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      <PatientForm />
    </div>
  );
};

export default Index;
