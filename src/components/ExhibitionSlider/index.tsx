import S from './style.module.scss';
import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Keyboard } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import ExhibitionInfo from './ExhibitionInfo';

type ExhibitionInfo = {
  schoolName: string;
  major: string;
  posterUrl: string;
  exhiId: string;
};

interface ExhibitionSliderProps {
  exhibitions: ExhibitionInfo[];
}

function ExhibitionSlider({ exhibitions }: ExhibitionSliderProps) {
  const swiperParams: SwiperOptions = {
    modules: [Pagination, A11y, Keyboard],
    spaceBetween: 30,
    loop: true,
    slidesPerView: 4,
    keyboard: { enabled: true },
    pagination: { clickable: true },
  };

  return (
    <div className={S.exhibitContainer}>
      <Swiper {...swiperParams} className={S.swiper}>
        {exhibitions.map(({ schoolName, major, posterUrl, exhiId }) => (
          <SwiperSlide key={exhiId} className={S.slide}>
            <ExhibitionInfo schoolName={schoolName} major={major} posterUrl={posterUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default memo(ExhibitionSlider);
