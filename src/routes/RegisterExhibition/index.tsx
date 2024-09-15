import React, { useState, useCallback } from 'react';
import axios from 'axios';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import ImageUpload from './components/imagePreview';
import RequireInfo from './components/requiredinfo';
import SelectInfo from './components/selectinfo';
import { useImageUploadStore } from '@/stores/imageUploadStore';

interface ExhibitionData {
  School: string;
  Major: string;
  Title: string;
  Address: string;
  Start: string;
  End: string;
  Time: string;
  Introduce: string;
  URL: string;
  Contact: string;
  Poster: File | null;
}

const POCKETBASE_API = import.meta.env.VITE_DB_URL;

const initialExhibitionData: ExhibitionData = {
  School: '',
  Major: '',
  Title: '',
  Address: '',
  Start: '',
  End: '',
  Time: '',
  Introduce: '',
  URL: '',
  Contact: '',
  Poster: null,
};

export function Component() {
  useDocumentTitle('전시 등록 | JJ.com');

  const [exhibitionData, setExhibitionData] = useState<ExhibitionData>(initialExhibitionData);
  const [error, setError] = useState<string | null>(null);
  const { reset: resetImageUpload } = useImageUploadStore();

  const handleInputChange = useCallback((name: string, value: string) => {
    setExhibitionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  //이미지가 업로드 될때  poster필드 업데이트
  const handleImageUpload = useCallback((file: File | null) => {
    setExhibitionData((prevData) => ({
      ...prevData,
      Poster: file,
    }));
  }, []);

  //초기상태 리셋
  const resetForm = useCallback(() => {
    setExhibitionData(initialExhibitionData);
    resetImageUpload();
  }, [resetImageUpload]);

  const validateData = useCallback(() => {
    const requiredFields = ['School', 'Major', 'Title', 'Address', 'Start', 'End', 'Time', 'Introduce'];
    for (const field of requiredFields) {
      if (!exhibitionData[field as keyof ExhibitionData]) {
        setError(`${field} 필수입니다.`);
        return false;
      }
    }
    //포스터는 따로줘야해서 넣어뒀습니닷
    if (!exhibitionData.Poster) {
      setError('포스터는 필수입니다.');
      return false;
    }
    return true;
  }, [exhibitionData]);

  //학교랑 학과 expand 릴레이션으로 연결되어있어서 받아와서 찾은다음에 없으면 새로 생성
  const findOrCreateRecord = useCallback(async (collectionName: string, name: string): Promise<string> => {
    try {
      const searchResponse = await axios.get(
        `${POCKETBASE_API}/api/collections/${collectionName}/records?filter=(Name='${name}')`
      );

      if (searchResponse.data.items.length > 0) {
        return searchResponse.data.items[0].id;
      } else {
        const createResponse = await axios.post(`${POCKETBASE_API}/api/collections/${collectionName}/records`, {
          Name: name,
        });
        return createResponse.data.id;
      }
    } catch (error) {
      console.error(`컬렉션 못만듬 ${collectionName}:`, error);
      throw error;
    }
  }, []);

  //폼제출
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);

      if (!validateData()) {
        return;
      }

      try {
        const schoolId = await findOrCreateRecord('School', exhibitionData.School);
        const majorId = await findOrCreateRecord('Major', exhibitionData.Major);

        const formData = new FormData();

        Object.entries(exhibitionData).forEach(([key, value]) => {
          if (key === 'Poster' && value instanceof File) {
            formData.append('Poster', value, value.name);
          } else if (key === 'School') {
            formData.append('School', schoolId);
          } else if (key === 'Major') {
            formData.append('Major', majorId);
          } else if (key === 'Time') {
            const timeArray = value.split(',').map((item: string) => item.trim());
            formData.append('Time', JSON.stringify({ time: timeArray }));
          } else if (typeof value === 'string') {
            formData.append(key, value);
          }
        });

        const response = await axios.post(`${POCKETBASE_API}/api/collections/Exhibition/records`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('성공하면 데이터:', response.data);
        alert('등록이 완료되었습니다! 관리자의 승인 후 게시됩니다!');
        resetForm();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('Error response:', error.response.data);
          setError(`Submission failed: ${error.response.data.message || 'Unknown error'}`);
        } else {
          console.error('실패시:', error);
          setError('다시시도해주세욤.');
        }
      }
    },
    [exhibitionData, validateData, findOrCreateRecord, resetForm]
  );

  return (
    <main id="page" className={S.component}>
      <h2 className={S.title}>전시 등록</h2>
      <span className={S.subtitle}>모든 전시는 관리자의 검토 후 등록됩니다. 검토에는 3-5일이 소요됩니다.</span>
      {error && <div className={S.error}>{error}</div>}
      <form className={S.infocontainer} onSubmit={handleSubmit}>
        <div className={S.formrow}>
          <ImageUpload onImageUpload={handleImageUpload} />
          <div className={S.requireinfo}>
            <h3>필수 정보 등록 *</h3>
            <RequireInfo exhibitionData={exhibitionData} onInputChange={handleInputChange} />
          </div>
        </div>
        <SelectInfo exhibitionData={exhibitionData} onInputChange={handleInputChange} />
        <button type="submit" className={S.submitbutton}>
          제출하기
        </button>
      </form>
    </main>
  );
}
