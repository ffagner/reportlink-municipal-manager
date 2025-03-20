
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import AdminReportManager from '@/components/AdminReportManager';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AnimatedTransition from '@/components/AnimatedTransition';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else if (!isAdmin) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      <Navigation />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <AnimatedTransition animation="fade" className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold">Área Administrativa</h1>
          </div>
          <Alert className="mb-8">
            <AlertDescription>
              Bem-vindo à área administrativa. Aqui você pode gerenciar os relatórios disponíveis para cada município.
            </AlertDescription>
          </Alert>
        </AnimatedTransition>
        
        <AdminReportManager />
      </main>
    </div>
  );
};

export default AdminDashboard;
