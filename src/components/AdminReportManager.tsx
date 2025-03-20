
import React, { useState, useEffect } from 'react';
import { 
  reports as allReports, 
  Report,
  getCategories
} from '@/lib/reportData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash, Search, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedTransition from '@/components/AnimatedTransition';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminReportManager: React.FC = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([...allReports]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([...allReports]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  
  // List of municipalities
  const municipalities = [
    { id: 'all', name: 'Todos os Municípios' },
    { id: 'mun1', name: 'São Paulo' },
    { id: 'mun2', name: 'Rio de Janeiro' },
    { id: 'mun3', name: 'Belo Horizonte' },
    { id: 'mun4', name: 'Salvador' },
    { id: 'mun5', name: 'Brasília' },
  ];
  
  const categories = getCategories();

  useEffect(() => {
    let filtered = [...reports];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        report => 
          report.title.toLowerCase().includes(query) || 
          report.description.toLowerCase().includes(query) ||
          report.category.toLowerCase().includes(query)
      );
    }
    
    // Apply municipality filter
    if (selectedMunicipality !== 'all') {
      filtered = filtered.filter(report => report.municipalityId === selectedMunicipality);
    }
    
    setFilteredReports(filtered);
  }, [reports, searchQuery, selectedMunicipality]);

  const handleAddReport = () => {
    const newReport: Report = {
      id: Date.now().toString(), // Simple ID generation
      title: '',
      description: '',
      url: '',
      municipalityId: selectedMunicipality !== 'all' ? selectedMunicipality : 'all',
      category: '',
      date: new Date().toISOString().split('T')[0],
    };
    setCurrentReport(newReport);
    setIsDialogOpen(true);
  };

  const handleEditReport = (report: Report) => {
    setCurrentReport({...report});
    setIsDialogOpen(true);
  };

  const handleDeleteReport = (report: Report) => {
    setCurrentReport(report);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!currentReport) return;
    
    const updatedReports = reports.filter(r => r.id !== currentReport.id);
    setReports(updatedReports);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Relatório excluído",
      description: `O relatório "${currentReport.title}" foi removido com sucesso.`,
    });
  };

  const saveReport = () => {
    if (!currentReport) return;
    
    // Validate required fields
    if (!currentReport.title || !currentReport.url || !currentReport.municipalityId || !currentReport.category) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    let updatedReports;
    const existingIndex = reports.findIndex(r => r.id === currentReport.id);
    
    if (existingIndex >= 0) {
      // Update existing report
      updatedReports = [...reports];
      updatedReports[existingIndex] = currentReport;
      
      toast({
        title: "Relatório atualizado",
        description: `O relatório "${currentReport.title}" foi atualizado com sucesso.`,
      });
    } else {
      // Add new report
      updatedReports = [...reports, currentReport];
      
      toast({
        title: "Relatório adicionado",
        description: `O relatório "${currentReport.title}" foi adicionado com sucesso.`,
      });
    }
    
    setReports(updatedReports);
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentReport) return;
    
    const { name, value } = e.target;
    setCurrentReport({
      ...currentReport,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!currentReport) return;
    
    setCurrentReport({
      ...currentReport,
      [name]: value,
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Gerenciar Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Button onClick={handleAddReport} className="gap-2">
                <Plus className="h-4 w-4" /> Adicionar Relatório
              </Button>
              
              <Select 
                value={selectedMunicipality} 
                onValueChange={setSelectedMunicipality}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Filtrar por município" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map(mun => (
                    <SelectItem key={mun.id} value={mun.id}>
                      {mun.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pesquisar relatórios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[280px]"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Categoria</TableHead>
                  <TableHead className="hidden md:table-cell">Município</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      Nenhum relatório encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{report.category}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {municipalities.find(m => m.id === report.municipalityId)?.name || 'Desconhecido'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(report.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditReport(report)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteReport(report)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add/Edit Report Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {currentReport && reports.some(r => r.id === currentReport.id) 
                ? 'Editar Relatório' 
                : 'Adicionar Relatório'
              }
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes do relatório abaixo. Os campos marcados com * são obrigatórios.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right text-sm font-medium">
                Título *
              </label>
              <Input
                id="title"
                name="title"
                className="col-span-3"
                value={currentReport?.title || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium">
                Descrição
              </label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
                value={currentReport?.description || ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="url" className="text-right text-sm font-medium">
                URL do Relatório *
              </label>
              <Input
                id="url"
                name="url"
                className="col-span-3"
                value={currentReport?.url || ''}
                onChange={handleInputChange}
                placeholder="https://app.powerbi.com/report..."
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right text-sm font-medium">
                Categoria *
              </label>
              <div className="col-span-3">
                <Select 
                  value={currentReport?.category || ''} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="nova">+ Nova Categoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {currentReport?.category === 'nova' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="newCategory" className="text-right text-sm font-medium">
                  Nova Categoria *
                </label>
                <Input
                  id="newCategory"
                  name="category"
                  className="col-span-3"
                  value=""
                  onChange={handleInputChange}
                  placeholder="Digite o nome da nova categoria"
                />
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="municipality" className="text-right text-sm font-medium">
                Município *
              </label>
              <div className="col-span-3">
                <Select 
                  value={currentReport?.municipalityId || ''} 
                  onValueChange={(value) => handleSelectChange('municipalityId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um município" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipalities.map(mun => (
                      <SelectItem key={mun.id} value={mun.id}>
                        {mun.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="thumbnail" className="text-right text-sm font-medium">
                URL da Imagem
              </label>
              <Input
                id="thumbnail"
                name="thumbnail"
                className="col-span-3"
                value={currentReport?.thumbnail || ''}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right text-sm font-medium">
                Data
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                className="col-span-3"
                value={currentReport?.date || new Date().toISOString().split('T')[0]}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button 
              type="button"
              onClick={saveReport}
            >
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o relatório "{currentReport?.title}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="button"
              variant="destructive"
              onClick={confirmDelete}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReportManager;
