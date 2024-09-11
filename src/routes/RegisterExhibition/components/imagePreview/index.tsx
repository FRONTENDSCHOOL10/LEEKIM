import { ChangeEvent, ReactElement, DragEvent, useState } from 'react';
import S from './style.module.scss';
import camera from '../../assets/camera.svg';
import { useImageUploadStore } from '@/stores/imageUploadStore';

interface DragState {
  isDragging: boolean;
}

function ImageUpload(): ReactElement {
  const { preview, setSelectedFile, setPreview } = useImageUploadStore();
  const [isDragging, setIsDragging] = useState<DragState['isDragging']>(false);

  function handleFile(file: File): void {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = function () {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div
      className={`${S.imageupload} ${isDragging ? S.dragging : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <img src={preview} alt="Preview" className={S.previewimage} />
      ) : (
        <label htmlFor="file-upload" className={S.placeholder}>
          <img src={camera} alt="사진첨부" className={S.cameraicon} />
          <p>드래그 앤 드롭</p>
        </label>
      )}
      <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className={S.fileinput} />
    </div>
  );
}

export default ImageUpload;
