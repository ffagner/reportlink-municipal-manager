
export type Report = {
  id: string;
  title: string;
  description: string;
  url: string;
  municipalityId: string;
  category: string;
  date: string;
  thumbnail?: string;
};

// Mock reports data
export const reports: Report[] = [
  {
    id: '1',
    title: 'Avaliação Anual - Ensino Fundamental',
    description: 'Resultados da avaliação anual das escolas de ensino fundamental',
    url: 'https://app.powerbi.com/report1',
    municipalityId: 'mun1',
    category: 'Ensino Fundamental',
    date: '2023-12-15',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Avaliação Trimestral - Ensino Médio',
    description: 'Resultados do último trimestre para escolas de ensino médio',
    url: 'https://app.powerbi.com/report2',
    municipalityId: 'mun1',
    category: 'Ensino Médio',
    date: '2024-03-10',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Comparativo Anual - Todas as Escolas',
    description: 'Comparação anual de desempenho entre todas as escolas',
    url: 'https://app.powerbi.com/report3',
    municipalityId: 'mun1',
    category: 'Geral',
    date: '2024-01-05',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Avaliação de Alfabetização',
    description: 'Resultados do programa de alfabetização nas escolas primárias',
    url: 'https://app.powerbi.com/report4',
    municipalityId: 'mun2',
    category: 'Alfabetização',
    date: '2024-02-20',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Desempenho em Matemática',
    description: 'Análise detalhada do desempenho em matemática por série',
    url: 'https://app.powerbi.com/report5',
    municipalityId: 'mun2',
    category: 'Matemática',
    date: '2024-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Indicadores de Leitura',
    description: 'Métricas de habilidade de leitura por faixa etária',
    url: 'https://app.powerbi.com/report6',
    municipalityId: 'mun3',
    category: 'Português',
    date: '2023-11-30',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '7',
    title: 'Evolução do IDEB',
    description: 'Análise histórica da evolução do IDEB nas escolas',
    url: 'https://app.powerbi.com/report7',
    municipalityId: 'mun3',
    category: 'IDEB',
    date: '2024-03-01',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'Avaliação de Ciências',
    description: 'Resultados das avaliações de ciências por escola',
    url: 'https://app.powerbi.com/report8',
    municipalityId: 'mun4',
    category: 'Ciências',
    date: '2024-02-10',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '9',
    title: 'Frequência Escolar',
    description: 'Análise de frequência escolar por período',
    url: 'https://app.powerbi.com/report9',
    municipalityId: 'mun4',
    category: 'Frequência',
    date: '2024-01-25',
    thumbnail: 'https://images.unsplash.com/photo-1511551203524-9a24350a5771?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '10',
    title: 'Avaliação de Desempenho Docente',
    description: 'Resultados da avaliação de desempenho dos professores',
    url: 'https://app.powerbi.com/report10',
    municipalityId: 'mun5',
    category: 'Docentes',
    date: '2023-12-05',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '11',
    title: 'Evasão Escolar',
    description: 'Análise dos índices de evasão escolar',
    url: 'https://app.powerbi.com/report11',
    municipalityId: 'mun5',
    category: 'Evasão',
    date: '2024-02-28',
    thumbnail: 'https://images.unsplash.com/photo-1580237072620-771a29a42afd?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '12',
    title: 'Avaliação Geral - Sistema Educacional',
    description: 'Visão geral do sistema educacional',
    url: 'https://app.powerbi.com/report12',
    municipalityId: 'all',
    category: 'Geral',
    date: '2024-03-15',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=200&auto=format&fit=crop'
  }
];

// Function to filter reports by municipality
export const getReportsByMunicipality = (municipalityId: string): Report[] => {
  if (municipalityId === 'all') {
    return reports;
  }
  
  return reports.filter(
    report => report.municipalityId === municipalityId || report.municipalityId === 'all'
  );
};

// Function to get categories
export const getCategories = (): string[] => {
  const categories = new Set(reports.map(report => report.category));
  return Array.from(categories);
};

// Function to filter reports by category
export const filterReportsByCategory = (reports: Report[], category: string | null): Report[] => {
  if (!category) return reports;
  return reports.filter(report => report.category === category);
};
