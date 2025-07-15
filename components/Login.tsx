import React, { useState } from 'react';
import { LogoIcon } from './icons';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'andrea' && password === 'Blvrcn@2025!') {
      onLoginSuccess();
    } else {
      setError('Credenziali non valide. Riprova.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm mx-auto">
        
        <div className="flex items-center justify-center gap-3 mb-6">
             <LogoIcon className="w-10 h-10 text-sky-500" />
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Accesso
             </h1>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200/80">
          <p className="text-center text-slate-600 mb-6">
            Inserisci le tue credenziali per usare l'analizzatore.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm" role="alert">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                Utente
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password"className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
              >
                Accedi
              </button>
            </div>
          </form>
        </div>
        <footer className="text-center mt-8 text-sm text-slate-500">
            <p>Powered by Google Gemini & React.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
