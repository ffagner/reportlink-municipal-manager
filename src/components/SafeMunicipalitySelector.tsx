
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AnimatedTransition from './AnimatedTransition';

interface MunicipalitySelectorProps {
  selectedCategory: string | null;
  categories: string[];
  onCategoryChange: (category: string | null) => void;
}

const SafeMunicipalitySelector: React.FC<MunicipalitySelectorProps> = ({
  selectedCategory,
  categories,
  onCategoryChange,
}) => {
  // Garantir que categories sempre contenha dados válidos
  const safeCategories = categories.filter(category => category && category.trim() !== '');
  
  const handleValueChange = (value: string) => {
    if (value === 'all') {
      onCategoryChange(null);
    } else {
      onCategoryChange(value);
    }
  };

  return (
    <AnimatedTransition animation="slide-down" className="mb-4 md:mb-0">
      <div className="w-full sm:max-w-xs">
        <Select 
          value={selectedCategory || 'all'} 
          onValueChange={handleValueChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {safeCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </AnimatedTransition>
  );
};

export default SafeMunicipalitySelector;
