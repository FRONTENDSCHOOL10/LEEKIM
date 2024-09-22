import { memo, useEffect, useRef, useState } from 'react';
import S from './style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import axios from 'axios';
import { TagData } from '@/types/TagData';

// FilterTag 컴포넌트의 props 타입 정의
interface FilterTag {
  tagDepartmentArray: string[];
  setTagDepartmentArray: React.Dispatch<React.SetStateAction<string[]>>;
  tagLocationArray: string[];
  setTagLocationArray: React.Dispatch<React.SetStateAction<string[]>>;
  tagYearArray: string[];
  setTagYearArray: React.Dispatch<React.SetStateAction<string[]>>;
}

// API 엔드포인트 URL
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

  // 컴포넌트 마운트 시 태그 데이터 가져오기
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

  // 부서 필터 처리 함수
  const handleDepartmentFilter = (tagId: string) => {
    if (tagDepartmentArray.includes(tagId)) {
      const nextArray = tagDepartmentArray.filter((id: string) => id !== tagId);
      setTagDepartmentArray(nextArray);
      return;
    }

    setTagDepartmentArray([...tagDepartmentArray, tagId]);
  };

  // 지역 필터 처리 함수
  const handleLocationFilter = (tagId: string) => {
    if (tagLocationArray.includes(tagId)) {
      const nextArray = tagLocationArray.filter((id: string) => id !== tagId);
      setTagLocationArray(nextArray);
      return;
    }

    setTagLocationArray([...tagLocationArray, tagId]);
  };

  // 연도 필터 처리 함수
  const handleYearFilter = (tagYear: string) => {
    if (tagYearArray.includes(tagYear)) {
      const nextArray = tagYearArray.filter((year: string) => year !== tagYear);
      setTagYearArray(nextArray);
      return;
    }

    setTagYearArray([...tagYearArray, tagYear]);
  };

  // Swiper 슬라이드 생성 함수
  const swiperCreater = (
    tagArray: TagData[],
    handleChangeFunc: (id: string) => void,
    isTagYear: boolean,
    selectedArray: string[]
  ) => {
    return (
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className={S.swiperContainer}
      >
        {Array.isArray(tagArray) &&
          tagArray.map(({ id, Name }) => {
            // 태그의 체크 상태 확인
            const isChecked = isTagYear ? selectedArray.includes(Name) : selectedArray.includes(id);
            return (
              <SwiperSlide key={id} className={`${S.swiperSlide} ${isChecked ? S.checked : ''}`}>
                <label htmlFor={id} className={S.tagLabel}>
                  #{Name}
                </label>
                <input
                  type="checkbox"
                  id={id}
                  onChange={() => {
                    if (isTagYear) {
                      handleChangeFunc(Name);
                    } else {
                      handleChangeFunc(id);
                    }
                  }}
                  checked={isChecked}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    );
  };

  return (
    <section className={`${S.component} ${isOpen ? S.open : S.closed}`}>
      {/* 필터 헤더 */}
      <div className={S.filterHeader}>
        <div className={S.headerwrapper}>
          <h2>필터 카테고리</h2>
          <img src="/Icon/IconFilter.svg" alt="" />
        </div>
        {/* 필터 토글 버튼 */}
        <button className={S.filterButton} onClick={handleToggle}>
          {isOpen ? <span>닫힘</span> : <span>열림</span>}
        </button>
      </div>

      {/* 필터 카테고리 목록 */}
      <form ref={filterFormRef} className={`${S.filterCategory} ${isOpen ? S.visible : S.hidden}`}>
        {/* 분야별 필터 */}
        <fieldset className={S.tagwrapper}>
          <div className={S.title}>
            <legend>분야별</legend>
            <img src="/Icon/IconArrow.svg" aria-hidden="true" />
          </div>
          {swiperCreater(tagDepartment, handleDepartmentFilter, false, tagDepartmentArray)}
        </fieldset>
        {/* 연도별 필터 */}
        <fieldset className={S.tagwrapper}>
          <div className={S.title}>
            <legend>지역별</legend>
            <img src="/Icon/IconArrow.svg" aria-hidden="true" />
          </div>
          {swiperCreater(tagLocation, handleLocationFilter, false, tagLocationArray)}
        </fieldset>
        {/* 지역별 필터 */}
        <fieldset className={S.tagwrapper}>
          <div className={S.title}>
            <legend>연도별</legend>
            <img src="/Icon/IconArrow.svg" aria-hidden="true" />
          </div>
          {swiperCreater(tagYear, handleYearFilter, true, tagYearArray)}
        </fieldset>
        <button className={S.resetButton}>초기화</button>
      </form>
    </section>
  );
}

export default memo(FilterTag);
