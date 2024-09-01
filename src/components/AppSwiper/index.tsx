import S from './style.module.scss';
import React from 'react';
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

interface AppSwiperProps {
  exhibitions: ExhibitionInfo[];
}
const AppSwiper: React.FC<AppSwiperProps> = ({ exhibitions }) => {
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
        {exhibitions.map((exhibition) => (
          <SwiperSlide key={exhibition.exhiId} className={S.slide}>
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
