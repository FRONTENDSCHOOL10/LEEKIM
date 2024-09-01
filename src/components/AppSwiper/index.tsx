import S from './style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Keyboard } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import { NavLink } from 'react-router-dom';

type ExhibitionInfo = {
  schoolName: string;
  major: string;
  posterUrl: string;
  exhiId: string;
};

const AppSwiper: React.FC = () => {
  const exhibitions: ExhibitionInfo[] = [
    {
      schoolName: '학교1',
      major: '전공1',
      posterUrl: 'poster1.jpg',
      exhiId: '1',
    },
    {
      schoolName: '학교2',
      major: '전공2',
      posterUrl: 'poster2.jpg',
      exhiId: '2',
    },
    {
      schoolName: '학교1',
      major: '전공1',
      posterUrl: 'poster1.jpg',
      exhiId: '1',
    },
    {
      schoolName: '학교2',
      major: '전공2',
      posterUrl: 'poster2.jpg',
      exhiId: '2',
    },
    {
      schoolName: '학교1',
      major: '전공1',
      posterUrl: 'poster1.jpg',
      exhiId: '1',
    },
    {
      schoolName: '학교2',
      major: '전공2',
      posterUrl: 'poster2.jpg',
      exhiId: '2',
    },
    {
      schoolName: '학교1',
      major: '전공1',
      posterUrl: 'poster1.jpg',
      exhiId: '1',
    },
    {
      schoolName: '학교2',
      major: '전공2',
      posterUrl: 'poster2.jpg',
      exhiId: '2',
    },
    {
      schoolName: '학교1',
      major: '전공1',
      posterUrl: 'poster1.jpg',
      exhiId: '1',
    },
    {
      schoolName: '학교2',
      major: '전공2',
      posterUrl: 'poster2.jpg',
      exhiId: '2',
    },
  ];

  const swiperParams: SwiperOptions = {
    modules: [Pagination, A11y, Keyboard],
    spaceBetween: 30,
    loop: true,
    slidesPerView: 4,
    slidesPerGroup: 4,
    keyboard: { enabled: true },
    pagination: { clickable: true },
  };

  return (
    <div className={S.exhibitContainer}>
      <Swiper {...swiperParams} className={S.swiper}>
        {exhibitions.map((exhibition, index) => (
          <SwiperSlide key={index} className={S.slide}>
            <figure className={S.poster}>
              <NavLink to={`/exhibition/Detail/${exhibition.exhiId}`}>
                <img src={exhibition.posterUrl} alt={`${exhibition.schoolName} ${exhibition.major} 포스터`} />
              </NavLink>
              <figcaption className={S.schoolName}>{exhibition.schoolName}</figcaption>
              <p>{exhibition.major}</p>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AppSwiper;
