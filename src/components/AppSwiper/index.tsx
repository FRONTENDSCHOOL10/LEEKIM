import S from './style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Keyboard } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

const AppSwiper: React.FC = () => {
  const slides = [1, 2, 3, 4, 5, 6, 7, 8]; // 임시

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
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={S.slide}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AppSwiper;
