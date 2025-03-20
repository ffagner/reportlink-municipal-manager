
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import AnimatedTransition from './AnimatedTransition';
import {
  LogOut,
  Menu,
  X,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    toast.success('Você saiu com sucesso');
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <AnimatedTransition animation="fade" className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">MuniReport</span>
        </AnimatedTransition>

        {user && (
          <>
            {/* Desktop menu */}
            <nav className="hidden md:flex items-center gap-6">
              <span className="text-sm text-muted-foreground">
                Município: <strong>{user.municipality.name}</strong>
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                <LogOut className="h-4 w-4 mr-1" />
                Sair
              </Button>
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && user && (
        <AnimatedTransition
          animation="slide-down"
          className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-4"
        >
          <div className="container flex flex-col space-y-3 px-4">
            <div className="text-sm text-muted-foreground px-2 py-2 rounded-md bg-secondary">
              Município: <strong>{user.municipality.name}</strong>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="flex justify-start items-center">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </AnimatedTransition>
      )}
    </header>
  );
};

export default Navigation;
