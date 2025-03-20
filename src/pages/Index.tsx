
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/LoginForm';
import AnimatedTransition from '@/components/AnimatedTransition';
import { BarChart3 } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      <AnimatedTransition animation="fade" className="mb-8 flex flex-col items-center">
        <div className="flex items-center mb-2">
          <BarChart3 className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold">MuniReport</h1>
        </div>
        <p className="text-center text-muted-foreground max-w-md">
          Portal centralizado de acesso aos relatórios de avaliações escolares para municípios
        </p>
      </AnimatedTransition>
      
      <LoginForm />
      
      <AnimatedTransition animation="fade" delay={300} className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MuniReport. Todos os direitos reservados.</p>
      </AnimatedTransition>
    </div>
  );
};

export default Index;
