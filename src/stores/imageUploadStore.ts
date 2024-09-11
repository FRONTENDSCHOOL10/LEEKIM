import { create } from 'zustand';

interface ImageUploadState {
  selectedFile: File | null;
  preview: string | null;
  setSelectedFile: (file: File | null) => void;
  setPreview: (preview: string | null) => void;
  reset: () => void;
}

export const useImageUploadStore = create<ImageUploadState>((set) => ({
  selectedFile: null,
  preview: null,
  setSelectedFile: (file: File | null) => set({ selectedFile: file }),
  setPreview: (preview: string | null) => set({ preview }),
  reset: () => set({ selectedFile: null, preview: null }),
}));
