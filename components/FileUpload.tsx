
import React, { useState, useCallback } from 'react';
import { FileAudioIcon, Trash2Icon } from './icons';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, file }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'audio/mpeg' || droppedFile.type === 'audio/wav') {
        onFileChange(droppedFile);
      } else {
        alert("Per favore, carica solo file MP3 o WAV.");
      }
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  };

  const handleRemoveFile = (): void => {
    onFileChange(null);
  };

  if (file) {
    return (
      <div className="flex items-center justify-between p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <div className="flex items-center gap-4">
          <FileAudioIcon className="h-8 w-8 text-sky-500" />
          <div>
            <p className="font-semibold text-slate-800">{file.name}</p>
            <p className="text-sm text-slate-500">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>
        <button
          onClick={handleRemoveFile}
          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
          aria-label="Rimuovi file"
        >
          <Trash2Icon className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${
        isDragging ? 'border-sky-500 bg-sky-50' : 'border-slate-300 hover:border-sky-400'
      }`}
    >
      <input
        type="file"
        id="file-upload"
        accept=".mp3,.wav"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
        <FileAudioIcon className="h-12 w-12 text-slate-400 mb-4" />
        <p className="text-slate-600 font-semibold">
          Trascina qui il tuo file MP3/WAV o{' '}
          <span className="text-sky-600 font-bold">clicca per selezionare</span>
        </p>
        <p className="text-sm text-slate-500 mt-1">Dimensione massima 50MB</p>
      </label>
    </div>
  );
};

export default FileUpload;
