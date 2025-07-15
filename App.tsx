import React, { useState, useCallback } from 'react';
import { AnalysisType } from './types';
import { analyzeAudio } from './services/geminiService';
import FileUpload from './components/FileUpload';
import AnalysisOptions from './components/AnalysisOptions';
import ResultDisplay from './components/ResultDisplay';
import { LogoIcon } from './components/icons';
import Login from './components/Login';

export default function App(): React.ReactNode {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisType | null>(null);

  const handleLoginSuccess = (): void => {
    setIsAuthenticated(true);
  };

  const handleFileChange = (selectedFile: File | null): void => {
    setFile(selectedFile);
    setResult('');
    setError(null);
    setCurrentAnalysis(null);
  };

  const handleAnalysisRequest = useCallback(async (type: AnalysisType): Promise<void> => {
    if (!file) {
      setError("Per favore, carica un file prima di avviare l'analisi.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult('');
    setCurrentAnalysis(type);

    try {
      const analysisResult = await analyzeAudio(file, type);
      setResult(analysisResult);
    } catch (e) {
      console.error("Analysis failed:", e);
      const errorMessage = e instanceof Error ? e.message : 'Si è verificato un errore sconosciuto.';
      setError(`Analisi fallita: ${errorMessage}. Controlla la console per maggiori dettagli.`);
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100/50 text-slate-800 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
             <LogoIcon className="w-10 h-10 text-sky-500" />
             <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                Analizzatore Audio AI
             </h1>
          </div>
          <p className="text-lg text-slate-600">
            Carica un file audio per ottenere riassunti, mappe mentali e analisi degli speaker con Gemini.
          </p>
        </header>

        <main className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80">
                 <FileUpload onFileChange={handleFileChange} file={file} />
            </div>
          
            {file && (
                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80">
                    <AnalysisOptions onSelectAnalysis={handleAnalysisRequest} disabled={isLoading} />
                 </div>
            )}
            
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow" role="alert">
                    <p className="font-bold">Errore</p>
                    <p>{error}</p>
                </div>
            )}

            {(isLoading || result) && (
                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80">
                    <ResultDisplay 
                        result={result} 
                        isLoading={isLoading} 
                        analysisType={currentAnalysis}
                        fileName={file?.name.split('.')[0] ?? 'analisi'} 
                    />
                 </div>
            )}
        </main>

        <footer className="text-center mt-12 text-sm text-slate-500">
            <p>Powered by Google Gemini & React. Realizzato con passione.</p>
        </footer>
      </div>
    </div>
  );
}