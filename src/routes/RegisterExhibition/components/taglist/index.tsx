import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import S from './style.module.scss'; // 스타일 모듈을 import 했다고 가정합니다.

interface Tag {
  id: string;
  Name: string;
}

interface TagListProps {
  onTagChange: (selectedTags: { departments: string[]; locations: string[] }) => void;
  resetTags: boolean;
}

const TagList = ({ onTagChange, resetTags }: TagListProps) => {
  const [tagDepartment, setTagDepartment] = useState<Tag[]>([]);
  const [tagLocation, setTagLocation] = useState<Tag[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const dbApiUrl = import.meta.env.VITE_DB_URL;

  useEffect(() => {
    const getTagData = async () => {
      try {
        const [departmentRes, locationRes] = await Promise.all([
          axios.get(`${dbApiUrl}api/collections/TagDepartment/records`),
          axios.get(`${dbApiUrl}api/collections/TagLocation/records`),
        ]);

        setTagDepartment(departmentRes.data.items);
        setTagLocation(locationRes.data.items);
      } catch (err) {
        console.error('An error occurred:', err);
      }
    };

    getTagData();
  }, [dbApiUrl]);

  useEffect(() => {
    if (resetTags) {
      setSelectedDepartments([]);
      setSelectedLocations([]);
    }
  }, [resetTags]);

  const handleDepartmentChange = (id: string) => {
    setSelectedDepartments((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleLocationChange = (id: string) => {
    setSelectedLocations((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  useEffect(() => {
    onTagChange({ departments: selectedDepartments, locations: selectedLocations });
  }, [selectedDepartments, selectedLocations, onTagChange]);

  const swiperCreator = (tagArray: Tag[], handleChange: (id: string) => void, selectedArray: string[]) => {
    return (
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className={S.swiperContainer}
      >
        {tagArray.map(({ id, Name }) => (
          <SwiperSlide key={id} className={`${S.swiperSlide} ${selectedArray.includes(id) ? S.checked : ''}`}>
            <label htmlFor={id} className={S.tagLabel}>
              <input type="checkbox" id={id} onChange={() => handleChange(id)} checked={selectedArray.includes(id)} />#
              {Name}
            </label>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <div className={S.component}>
      <div className={S.tagwrapper}>
        <div className={S.title}>
          <h4>분야별</h4>
          <img src="/Icon/IconArrow.svg" aria-hidden="true" />
        </div>
        {swiperCreator(tagDepartment, handleDepartmentChange, selectedDepartments)}
      </div>

      <div className={S.tagwrapper}>
        <div className={S.title}>
          <h4>지역별</h4>
          <img src="/Icon/IconArrow.svg" aria-hidden="true" />
        </div>
        {swiperCreator(tagLocation, handleLocationChange, selectedLocations)}
      </div>
    </div>
  );
};

export default TagList;
