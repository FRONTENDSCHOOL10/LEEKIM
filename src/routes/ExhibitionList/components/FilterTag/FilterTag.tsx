import { memo, useEffect, useRef, useState } from 'react';
import S from './style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import axios from 'axios';
import { TagData } from '@/types/TagData';

interface FilterTag {
  tagDepartmentArray: string[];
  setTagDepartmentArray: React.Dispatch<React.SetStateAction<string[]>>;
  tagLocationArray: string[];
  setTagLocationArray: React.Dispatch<React.SetStateAction<string[]>>;
  tagYearArray: string[];
  setTagYearArray: React.Dispatch<React.SetStateAction<string[]>>;
}

const dbApiUrl = import.meta.env.VITE_DB_API;

function FilterTag({
  tagDepartmentArray,
  setTagDepartmentArray,
  tagLocationArray,
  setTagLocationArray,
  tagYearArray,
  setTagYearArray,
}: FilterTag) {
  // 필터 태그 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // 서버에서 필터 목록 받아올 상태
  const [tagDepartment, setTagDepartment] = useState<TagData[]>([]);
  const [tagLocation, setTagLocation] = useState<TagData[]>([]);
  const [tagYear, setTagYear] = useState<TagData[]>([]);

  // 필터 카테고리 목록에 대한 ref
  const filterFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const getTagDepartment = async () => {
      try {
        const response = await axios.get(`${dbApiUrl}/collections/TagDepartment/records`);
        setTagDepartment(response.data.items);
      } catch (err) {
        console.error('An error occurred:', err);
      }
    };

    const getTagLocation = async () => {
      try {
        const response = await axios.get(`${dbApiUrl}/collections/TagLocation/records`);
        setTagLocation(response.data.items);
      } catch (err) {
        console.error('An error occurred:', err);
      }
    };

    const getTagYear = async () => {
      try {
        const response = await axios.get(`${dbApiUrl}/collections/TagYear/records?sort=-Name`);
        setTagYear(response.data.items);
      } catch (err) {
        console.error('An error occurred:', err);
      }
    };

    getTagDepartment();
    getTagLocation();
    getTagYear();
  }, []);

  // 필터 열기/닫기 토글 함수
  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleDepartmentFilter = (tagId: string) => {
    if (tagDepartmentArray.includes(tagId)) {
      const nextArray = tagDepartmentArray.filter((id: string) => id !== tagId);
      setTagDepartmentArray(nextArray);
      return;
    }

    const nextArray = tagDepartmentArray;

    nextArray.push(tagId);
    setTagDepartmentArray([...nextArray]);
  };

  const handleLocationFilter = (tagId: string) => {
    if (tagLocationArray.includes(tagId)) {
      const nextArray = tagLocationArray.filter((id: string) => id !== tagId);
      setTagLocationArray(nextArray);
      return;
    }

    const nextArray = tagLocationArray;

    nextArray.push(tagId);
    setTagLocationArray([...nextArray]);
  };

  const handleYearFilter = (tagYear: string) => {
    if (tagYearArray.includes(tagYear)) {
      const nextArray = tagYearArray.filter((year: string) => year !== tagYear);
      setTagYearArray(nextArray);
      return;
    }

    const nextArray = tagYearArray;

    nextArray.push(tagYear);
    setTagYearArray([...nextArray]);
  };

  const swiperCreater = (tagArray: TagData[], handleChangeFunc: (id: string) => void, isTagYear: boolean) => {
    return (
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className={S.swiperContainer}
      >
        {tagArray.map(({ id, Name }) => (
          <SwiperSlide key={id.slice(0, 5)} className={S.swiperSlide}>
            <label htmlFor={id.slice(0, 5)}>#{Name}</label>
            <input
              type="checkbox"
              id={id.slice(0, 5)}
              onChange={() => {
                if (isTagYear) {
                  handleChangeFunc(Name);
                } else {
                  handleChangeFunc(id);
                }
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <section className={S.component}>
      <div className={S.filterHeader}>
        <div>
          <h2>필터 카테고리</h2>
          <img src="/Icon/IconFilter.svg" alt="" />
        </div>
        {/* 필터 토글 버튼 */}
        <button className={S.filterButton} onClick={handleToggle}>
          <img src="/Icon/IconClose.svg" />
          {/* <img src={isOpen ? '/Icon/IconClose.svg' : '/Icon/IconOpen.svg'} alt={isOpen ? '필터 닫기' : '필터 열기'} /> */}
        </button>
      </div>

      {/* 필터 카테고리 목록 */}
      <form ref={filterFormRef} className={`${S.filterCategory} ${isOpen ? S.visible : S.hidden}`}>
        <fieldset>
          <legend>분야별</legend>
          <img src="/Icon/IconArrow.svg" aria-hidden="true" />
          {swiperCreater(tagDepartment, handleDepartmentFilter, false)}
        </fieldset>
        <fieldset>
          <legend>연도별</legend>
          <img src="/Icon/IconArrow.svg" aria-hidden="true" />
          {swiperCreater(tagLocation, handleLocationFilter, false)}
        </fieldset>
        <fieldset>
          <legend>지역별</legend>
          <img src="/Icon/IconArrow.svg" aria-hidden="true" />
          {swiperCreater(tagYear, handleYearFilter, true)}
        </fieldset>
        <button>초기화</button>
      </form>
    </section>
  );
}
export default memo(FilterTag);
