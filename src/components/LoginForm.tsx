
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AnimatedTransition from './AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (!success) {
        setError('Credenciais inválidas');
        toast.error('Falha no login. Verifique suas credenciais.');
      } else {
        toast.success('Login realizado com sucesso!');
      }
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.');
      toast.error('Erro ao processar login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedTransition animation="slide-up" className="w-full max-w-md mx-auto">
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Relatórios Municipais
          </CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar os relatórios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full h-10 transition-all"
            type="submit" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          <strong>Usuários de teste:</strong> saopaulo, rio, bh, salvador, brasilia
        </p>
        <p className="mt-1">
          <strong>Senha:</strong> [primeira duas letras]123 (ex: sp123, rj123)
        </p>
        <p className="mt-1">
          <strong>Admin:</strong> username: admin, senha: admin
        </p>
      </div>
    </AnimatedTransition>
  );
};

export default LoginForm;
