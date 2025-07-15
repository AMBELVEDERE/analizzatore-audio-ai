
import React from 'react';
import { AnalysisType } from '../types';
import { FileTextIcon, LayoutGridIcon, UsersIcon } from './icons';

interface AnalysisOptionsProps {
  onSelectAnalysis: (type: AnalysisType) => void;
  disabled: boolean;
}

const AnalysisOptions: React.FC<AnalysisOptionsProps> = ({ onSelectAnalysis, disabled }) => {
  const options = [
    {
      type: AnalysisType.Summary,
      label: 'Riassunto',
      description: 'Genera un sommario conciso del contenuto.',
      icon: FileTextIcon,
      color: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      type: AnalysisType.MindMap,
      label: 'Riassunto + Mappa',
      description: 'Crea un riassunto e una mappa mentale.',
      icon: LayoutGridIcon,
      color: 'bg-teal-500 hover:bg-teal-600',
    },
    {
      type: AnalysisType.Speaker,
      label: 'Speaker',
      description: 'Analizza i punti di vista di ogni interlocutore.',
      icon: UsersIcon,
      color: 'bg-indigo-500 hover:bg-indigo-600',
    },
  ];

  return (
    <div>
        <h2 className="text-lg font-semibold text-center mb-1 text-slate-800">Scegli un tipo di analisi</h2>
        <p className="text-center text-slate-500 mb-6">Seleziona un'opzione per avviare l'analisi del file audio.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
            <button
            key={option.type}
            onClick={() => onSelectAnalysis(option.type)}
            disabled={disabled}
            className={`flex flex-col items-start p-4 text-left text-white rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${option.color}`}
            >
                <div className="flex items-center gap-3 mb-2">
                    <option.icon className="w-6 h-6" />
                    <span className="text-xl font-bold">{option.label}</span>
                </div>
                <p className="text-sm opacity-90">{option.description}</p>
            </button>
        ))}
        </div>
    </div>
  );
};

export default AnalysisOptions;
