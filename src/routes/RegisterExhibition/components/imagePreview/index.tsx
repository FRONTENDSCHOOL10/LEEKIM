import React, { ChangeEvent, DragEvent, memo, useCallback, useEffect } from 'react';
import S from './style.module.scss';
import camera from '../../assets/camera.svg';
import { useImageUploadStore } from '@/stores/imageUploadStore';

interface ImageUploadProps {
  onImageUpload: (file: File | null) => void;
}

function ImageUpload({ onImageUpload }: ImageUploadProps): React.ReactElement {
  const { preview, setSelectedFile, setPreview } = useImageUploadStore();

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  //파일처리
  const handleFile = useCallback(
    (file: File): void => {
      setSelectedFile(file);
      onImageUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [setSelectedFile, onImageUpload, setPreview]
  );

  //여기서 선택된 파일을 handlefile로 전달해주는거임!
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.currentTarget.classList.add(S.dragging);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.currentTarget.classList.remove(S.dragging);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.currentTarget.classList.remove(S.dragging);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className={S.imageupload} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {preview ? (
        <img src={preview} alt="Preview" className={S.previewimage} />
      ) : (
        <label htmlFor="file-upload" className={S.placeholder}>
          <img src={camera} alt="사진첨부" className={S.cameraicon} />
          <p>드래그 앤 드롭</p>
          <p>포스터 첨부 필수</p>
        </label>
      )}
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={S.fileinput}
        required
      />
    </div>
  );
}

export default memo(ImageUpload);
