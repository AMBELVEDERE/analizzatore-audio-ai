
import React from 'react';
import { AnalysisType } from '../types';
import { DownloadIcon } from './icons';
import Spinner from './Spinner';

interface ResultDisplayProps {
  result: string;
  isLoading: boolean;
  analysisType: AnalysisType | null;
  fileName: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, analysisType, fileName }) => {
  
  const getTitle = (): string => {
    if (!analysisType) return 'Risultato';
    switch (analysisType) {
      case AnalysisType.Summary:
        return 'Riassunto dell\'Audio';
      case AnalysisType.MindMap:
        return 'Riassunto e Mappa Mentale';
      case AnalysisType.Speaker:
        return 'Analisi degli Speaker';
      default:
        return 'Risultato Analisi';
    }
  };
  
  const handleDownload = (): void => {
    if (!result || !analysisType) return;
    const blob = new Blob([result], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}_${analysisType}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Spinner />
        <p className="mt-4 text-lg font-semibold text-slate-700">Analisi in corso...</p>
        <p className="text-slate-500">Potrebbe richiedere qualche istante.</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">{getTitle()}</h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-sky-600 bg-sky-100 hover:bg-sky-200 rounded-md transition-colors duration-200"
        >
          <DownloadIcon className="w-4 h-4" />
          Download (.md)
        </button>
      </div>
      <div className="prose prose-slate max-w-none p-4 bg-slate-50 rounded-lg border border-slate-200 min-h-[200px] whitespace-pre-wrap">
        {result}
      </div>
    </div>
  );
};

export default ResultDisplay;
