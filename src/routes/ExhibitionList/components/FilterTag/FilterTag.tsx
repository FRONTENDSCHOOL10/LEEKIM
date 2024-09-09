import { memo, useEffect, useRef, useState } from 'react';
import S from './style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// renderSwiper 함수 props 타입 정의
interface RenderSwiperProps {
  tags: string[];
}

function FilterTag() {
  // 필터 태그 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 필터 카테고리 목록에 대한 ref
  const ulRef = useRef<HTMLUListElement>(null);

  // Dummy
  const fieldTags = [
    '게임그래픽디자인',
    '웹디자인',
    '프로그래밍',
    'UI/UX',
    '그래픽디자인',
    '미디어디자인',
    '패션디자인',
    '영상콘텐츠',
    '디자인공학',
    '아니 TS진짜',
    '모든 오류는 TS로부터',
    '왜 속성 적용이 안 되니?',
  ];
  const yearTags = ['2024', '2023', '2022', '2021', '2020'];
  const regionTags = ['서울', '경기', '인천', '부산', '대구'];

  // 필터 열기/닫기 토글 함수
  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  // 필터 메뉴 열릴 때 scrollIntoView() 주기 위함
  useEffect(() => {
    if (isOpen && ulRef.current) {
      ulRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  // Swiper 컴포넌트 렌더링 함수
  function renderSwiper({ tags }: RenderSwiperProps): JSX.Element {
    return (
      <Swiper
        slidesPerView={8}
        spaceBetween={10}
        // slidesOffsetAfter={20} 적용이 안 돼서 보류
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className={S.swiperContainer}
      >
        {tags.map((tag, index) => (
          <SwiperSlide key={index} className={S.swiperSlide}>
            <button className={S.tag}>#{tag}</button>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

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
      <ul ref={ulRef} className={`${S.filterCategory} ${isOpen ? S.visible : S.hidden}`}>
        <li>
          분야별
          <img src="/Icon/IconArrow.svg" alt="" />
        </li>
        {renderSwiper({ tags: fieldTags })}
        <li>
          연도별
          <img src="/Icon/IconArrow.svg" alt="" />
        </li>
        {renderSwiper({ tags: yearTags })}
        <li>
          지역별
          <img src="/Icon/IconArrow.svg" alt="" />
        </li>
        {renderSwiper({ tags: regionTags })}
        <button>초기화</button>
      </ul>
    </section>
  );
}
export default memo(FilterTag);
