
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import AdminReportManager from '@/components/AdminReportManager';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, Users, Settings, Plus } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('educacao');
  const [selectedMunicipality, setSelectedMunicipality] = useState('mun1');
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else if (!isAdmin) {
      navigate('/dashboard');
    }
    console.log("AdminDashboard rendered");
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const handleAddReport = () => {
    if (!title || !link || !category || !selectedMunicipality) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Simulação de adição de relatório
    toast.success('Relatório adicionado com sucesso!');
    setOpen(false);
    setTitle('');
    setLink('');
    setCategory('educacao');
    setSelectedMunicipality('mun1');
  };

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
        
        {/* Adicionar novo relatório manualmente */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Gerenciamento de Relatórios</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Relatório
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Relatório</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes do novo relatório abaixo.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Título do Relatório</Label>
                    <Input 
                      id="title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      placeholder="Ex: Relatório Anual de Desempenho" 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="link">Link do Relatório</Label>
                    <Input 
                      id="link" 
                      value={link} 
                      onChange={(e) => setLink(e.target.value)} 
                      placeholder="https://exemplo.com/relatorio.pdf" 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                        <SelectItem value="financas">Finanças</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="municipality">Município</Label>
                    <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um município" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mun1">São Paulo</SelectItem>
                        <SelectItem value="mun2">Rio de Janeiro</SelectItem>
                        <SelectItem value="mun3">Belo Horizonte</SelectItem>
                        <SelectItem value="mun4">Salvador</SelectItem>
                        <SelectItem value="mun5">Brasília</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button onClick={handleAddReport}>Adicionar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                <p className="text-yellow-800">
                  Esta é uma versão simplificada do gerenciador de relatórios. 
                  Um componente mais completo está sendo carregado abaixo.
                </p>
              </div>
              
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Título</th>
                    <th className="text-left py-2">Categoria</th>
                    <th className="text-left py-2">Município</th>
                    <th className="text-right py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Relatório Anual de Desempenho Escolar</td>
                    <td className="py-2">Educação</td>
                    <td className="py-2">São Paulo</td>
                    <td className="py-2 text-right">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-red-500">Excluir</Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Balanço Orçamentário 2023</td>
                    <td className="py-2">Finanças</td>
                    <td className="py-2">Rio de Janeiro</td>
                    <td className="py-2 text-right">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-red-500">Excluir</Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Plano Diretor de Infraestrutura</td>
                    <td className="py-2">Infraestrutura</td>
                    <td className="py-2">Belo Horizonte</td>
                    <td className="py-2 text-right">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-red-500">Excluir</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
        
        {/* O componente AdminReportManager continua disponível abaixo */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Gerenciador de Relatórios Completo</h2>
          <div id="admin-report-manager-container">
            <AdminReportManager />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
