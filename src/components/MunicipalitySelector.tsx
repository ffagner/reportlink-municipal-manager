
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import AnimatedTransition from './AnimatedTransition';

interface MunicipalitySelectorProps {
  selectedCategory: string | null;
  categories: string[];
  onCategoryChange: (category: string | null) => void;
}

const MunicipalitySelector: React.FC<MunicipalitySelectorProps> = ({ 
  selectedCategory, 
  categories, 
  onCategoryChange 
}) => {
  return (
    <AnimatedTransition animation="slide-down" className="w-full max-w-xs">
      <div className="space-y-2">
        <Label htmlFor="category">Filtrar por categoria</Label>
        <Select
          onValueChange={(value) => onCategoryChange(value || null)}
          value={selectedCategory || ""}
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="">Todas as categorias</SelectItem>
              {categories.map((category) => (
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

export default MunicipalitySelector;
