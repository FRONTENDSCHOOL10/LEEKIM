import React, { useState, useCallback } from 'react';
import axios from 'axios';
import S from './style.module.scss';
import ImageUpload from './components/imagePreview';
import RequireInfo from './components/requiredinfo';
import SelectInfo from './components/selectinfo';
import toast, { Toaster } from 'react-hot-toast';
import { useImageUploadStore } from '@/stores/imageUploadStore';
import TagList from './components/taglist';
import CommonHelmet from '@/components/CommonHelmet';

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
  TagDepartment: string[];
  TagLocation: string[];
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
  TagDepartment: [],
  TagLocation: [],
};

export function Component() {
  const [exhibitionData, setExhibitionData] = useState<ExhibitionData>(initialExhibitionData);
  const { reset: resetImageUpload } = useImageUploadStore();
  const [resetTags, setResetTags] = useState<boolean>(false);

  const handleInputChange = useCallback((name: string, value: string) => {
    setExhibitionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleTagChange = useCallback((selectedTags: { departments: string[]; locations: string[] }) => {
    setExhibitionData((prevData) => ({
      ...prevData,
      TagDepartment: selectedTags.departments,
      TagLocation: selectedTags.locations,
    }));
  }, []);

  const handleImageUpload = useCallback((file: File | null) => {
    setExhibitionData((prevData) => ({
      ...prevData,
      Poster: file,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setExhibitionData(initialExhibitionData);
    resetImageUpload();
    setResetTags(true);
    setTimeout(() => setResetTags(false), 0);
  }, [resetImageUpload]);

  const validateData = useCallback(() => {
    const requiredFields = ['School', 'Major', 'Title', 'Address', 'Start', 'End', 'Time', 'Introduce'];
    for (const field of requiredFields) {
      if (!exhibitionData[field as keyof ExhibitionData]) {
        toast.error(`${field} 필수입니다.`);
        return false;
      }
    }
    if (!exhibitionData.Poster) {
      toast.remove();
      toast.error('포스터는 필수입니다.');
      return false;
    }
    if (exhibitionData.TagDepartment.length === 0) {
      toast.remove();
      toast.error('분야별 태그를 하나 이상 선택해주세요.');
      return false;
    }
    if (exhibitionData.TagLocation.length === 0) {
      toast.remove();
      toast.error('지역별 태그를 하나 이상 선택해주세요.');
      return false;
    }
    return true;
  }, [exhibitionData]);

  const findOrCreateRecord = useCallback(async (collectionName: string, name: string): Promise<string> => {
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
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!validateData()) {
        return;
      }

      try {
        toast.remove();
        toast.loading('전시 등록중입니다..');
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
          } else if (key === 'TagDepartment' || key === 'TagLocation') {
            (value as string[]).forEach((id) => {
              formData.append(`${key}`, id);
            });
          } else if (typeof value === 'string') {
            formData.append(key, value);
          }
        });

        await axios.post(`${POCKETBASE_API}/api/collections/Exhibition/records`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.remove();
        toast.success('등록이 완료되었습니다! 관리자의 승인 후 게시됩니다!');
        resetForm();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.remove();
          toast.error(`제출 실패: ${error.response.data.message || '알 수 없는 오류'}`);
        } else {
          toast.remove();
          toast.error('다시 시도해주세요.');
        }
      }
    },
    [exhibitionData, validateData, findOrCreateRecord, resetForm]
  );

  return (
    <main id="page" className={S.component}>
      <CommonHelmet
        pageTitle="전시 등록"
        pageDescription="졸전 닷컴 전시 등록 페이지"
        keywords="졸전, 졸업 전시회, 전시 등록, 전시 관리, 전시회 등록"
      />

      <h2 className={S.title}>전시 등록</h2>
      <span className={S.subtitle}>모든 전시는 관리자의 검토 후 등록됩니다. 검토에는 3-5일이 소요됩니다.</span>

      <form className={S.infocontainer} onSubmit={handleSubmit}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={10}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 2000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 1500,
            },
          }}
        />
        <div className={S.formrow}>
          <ImageUpload onImageUpload={handleImageUpload} />
          <div className={S.requireinfo}>
            <h3>필수 정보 등록 *</h3>
            <RequireInfo exhibitionData={exhibitionData} onInputChange={handleInputChange} />
          </div>
        </div>
        <SelectInfo exhibitionData={exhibitionData} onInputChange={handleInputChange} />
        <span>태그 선택</span>
        <TagList onTagChange={handleTagChange} resetTags={resetTags} />
        <button type="submit" className={S.submitbutton}>
          제출하기
        </button>
      </form>
    </main>
  );
}
