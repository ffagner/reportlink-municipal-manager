
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/LoginForm';
import AnimatedTransition from '@/components/AnimatedTransition';
import { BarChart3, Database, CheckCircle2, XCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dbStatus, setDbStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Check database connection
    const checkDatabase = async () => {
      try {
        const response = await fetch('/api/db-status');
        if (response.ok) {
          setDbStatus('connected');
        } else {
          setDbStatus('error');
        }
      } catch (error) {
        console.error("Database connection error:", error);
        setDbStatus('error');
      }
    };
    
    checkDatabase();
  }, []);

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
      
      <AnimatedTransition animation="fade" delay={200} className="w-full max-w-md mt-8">
        <Alert>
          <Database className="h-4 w-4" />
          <AlertTitle className="flex items-center">
            Status do Banco de Dados SQLite + Prisma
            {dbStatus === 'connected' && <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />}
            {dbStatus === 'error' && <XCircle className="h-4 w-4 text-red-500 ml-2" />}
            {dbStatus === 'loading' && <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>}
          </AlertTitle>
          <AlertDescription>
            {dbStatus === 'loading' && "Verificando conexão com o banco de dados..."}
            {dbStatus === 'connected' && "Conectado com sucesso ao banco de dados SQLite via Prisma."}
            {dbStatus === 'error' && "Erro ao conectar ao banco de dados. Verifique se as migrações foram executadas."}
          </AlertDescription>
        </Alert>
      </AnimatedTransition>
      
      <AnimatedTransition animation="fade" delay={300} className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} MuniReport. Todos os direitos reservados.</p>
      </AnimatedTransition>
    </div>
  );
};

export default Index;
