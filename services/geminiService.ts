// services/geminiService.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisType } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error("Errore durante la lettura del file come base64."));
      }
    };
    reader.onerror = error => reject(error);
  });
};

const getPromptForAnalysisType = (type: AnalysisType): string => {
  switch (type) {
    case AnalysisType.Summary:
      return "Sei un assistente esperto nell'analisi di contenuti audio. Analizza la seguente registrazione audio e fornisci un riassunto conciso e chiaro dei punti principali discussi. Struttura il riassunto in paragrafi ben definiti e usa titoli per le sezioni chiave. L'output deve essere in formato Markdown.";
    case AnalysisType.MindMap:
      return "Sei un assistente esperto nell'analisi di contenuti audio. Analizza la seguente registrazione audio e crea due sezioni distinte in formato Markdown:\n\n### Riassunto Dettagliato\nUn riassunto completo della discussione, evidenziando i temi principali e le conclusioni.\n\n### Mappa Mentale\nUna mappa mentale che visualizzi i concetti chiave, le loro relazioni e i sotto-punti. Usa la sintassi Markdown con elenchi puntati nidificati per rappresentare la struttura gerarchica della mappa mentale (es. - Argomento Principale\\n  - Sotto-argomento\\n    - Dettaglio). Inizia dal concetto centrale.";
    case AnalysisType.Speaker:
      return "Sei un assistente AI specializzato in diarizzazione e analisi di conversazioni. Analizza la seguente registrazione audio. Per prima cosa, identifica i diversi speaker presenti (es. Speaker 1, Speaker 2, ecc.). Successivamente, per ogni speaker identificato, fornisci un riassunto conciso del suo punto di vista, delle sue argomentazioni principali e del suo contributo alla conversazione. Struttura l'output in formato Markdown, con una sezione H3 (`###`) dedicata a ogni speaker.";
    default:
      throw new Error('Tipo di analisi non valido');
  }
};

export const analyzeAudio = async (file: File, analysisType: AnalysisType): Promise<string> => {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new Error("La chiave API di Gemini non è stata configurata. Assicurati che la variabile d'ambiente VITE_GEMINI_API_KEY sia impostata.");
  }
  
  // *** QUESTE SONO LE RIGHE CORRETTE CHE DEVONO ESSERE NEL TUO CODICE ***

  // 1. Inizializza GoogleGenerativeAI passando un OGGETTO con apiKey
  const genAI = new GoogleGenerativeAI({ apiKey: GEMINI_API_KEY }); 

  // 2. Ottieni l'istanza del modello specifico che vuoi usare
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  // *** FINE RIGHE CORRETTE ***

  const base64Audio = await fileToBase64(file);
  
  const audioPart = {
    inlineData: {
      mimeType: file.type,
      data: base64Audio,
    },
  };

  const prompt = getPromptForAnalysisType(analysisType);
  const textPart = { text: prompt };

  // 3. Chiama generateContent() sull'istanza del modello
  const result = await model.generateContent({
    contents: [{ text: prompt }, audioPart],
  });

  const response = await result.response;
  return response.text(); 
};