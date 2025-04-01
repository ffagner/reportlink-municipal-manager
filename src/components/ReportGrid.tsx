
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ReportCard from './ReportCard';
import SafeMunicipalitySelector from './SafeMunicipalitySelector'; // Importando o componente seguro
import { getReportsByMunicipality, getCategories, filterReportsByCategory, Report } from '@/lib/reportData';
import AnimatedTransition from './AnimatedTransition';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ReportGrid: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      const municipalityId = user.municipality.id;
      const userReports = getReportsByMunicipality(municipalityId);
      setReports(userReports);
      setFilteredReports(userReports);
      
      // Garantindo que não haja categorias vazias
      const allCategories = getCategories();
      const validCategories = allCategories.filter(cat => cat && cat.trim() !== '');
      setCategories(validCategories);
    }
  }, [user]);

  useEffect(() => {
    let result = reports;
    
    // Apply category filter
    if (selectedCategory) {
      result = filterReportsByCategory(result, selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        report => 
          report.title.toLowerCase().includes(query) || 
          report.description.toLowerCase().includes(query) ||
          report.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredReports(result);
  }, [reports, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <AnimatedTransition animation="fade" className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Relatórios de {user?.municipality.name}
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Acesse os relatórios de avaliação escolar disponíveis para o seu município
        </p>
      </AnimatedTransition>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <SafeMunicipalitySelector
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />
        
        <AnimatedTransition animation="slide-down" delay={100} className="w-full max-w-xs relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar relatórios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </AnimatedTransition>
      </div>
      
      {filteredReports.length === 0 ? (
        <AnimatedTransition animation="fade" className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Nenhum relatório encontrado para os filtros selecionados.
          </p>
        </AnimatedTransition>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <ReportCard key={report.id} report={report} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportGrid;
