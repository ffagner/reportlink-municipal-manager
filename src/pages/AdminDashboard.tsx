
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import AdminReportManager from '@/components/AdminReportManager';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, Users, Settings } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnimatedTransition animation="slide-up" delay={100}>
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Relatórios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Relatórios ativos</p>
              </CardContent>
            </Card>
          </AnimatedTransition>
          
          <AnimatedTransition animation="slide-up" delay={200}>
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Municípios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-sm text-muted-foreground">Municípios ativos</p>
              </CardContent>
            </Card>
          </AnimatedTransition>
          
          <AnimatedTransition animation="slide-up" delay={300}>
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">
                  Gerenciar Configurações
                </Button>
              </CardContent>
            </Card>
          </AnimatedTransition>
        </div>
        
        <AdminReportManager />
      </main>
    </div>
  );
};

export default AdminDashboard;
