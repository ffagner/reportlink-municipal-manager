
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AnimatedTransition from './AnimatedTransition';
import { Report } from '@/lib/reportData';

interface ReportCardProps {
  report: Report;
  index: number;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, index }) => {
  const formattedDate = format(new Date(report.date), "dd 'de' MMMM, yyyy", { locale: ptBR });
  
  return (
    <AnimatedTransition 
      animation="scale" 
      delay={index * 100}
      className="hover-lift h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden glass-card border-0">
        {report.thumbnail && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={report.thumbnail} 
              alt={report.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge className="mb-2">{report.category}</Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </div>
          </div>
          <CardTitle className="text-lg">{report.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {report.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {/* Additional content could go here */}
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            className="w-full gap-2 group"
            onClick={() => window.open(report.url, '_blank')}
          >
            Visualizar Relatório
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </AnimatedTransition>
  );
};

export default ReportCard;
