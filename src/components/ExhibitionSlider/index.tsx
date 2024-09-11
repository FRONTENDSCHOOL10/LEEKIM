import S from './style.module.scss';
import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Keyboard } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import ExhibitionInfo from './components/ExhibitionInfo';
import { ExhibitionData } from '@/types/ExhibitionData';
import getImageURL from '@/utils/getImageURL';

interface ExhibitionDataList {
  items: ExhibitionData[];
}

function ExhibitionSlider({ exhibitions }: any) {
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
        {exhibitions.map((item: ExhibitionData) =>
          item ? (
            <SwiperSlide key={item.id} className={S.slide}>
              <ExhibitionInfo
                schoolName={item?.expand?.School?.Name as string}
                major={item?.expand?.Major?.Name as string}
                posterUrl={getImageURL(item)}
                exhiId={item.id}
              />
            </SwiperSlide>
          ) : null
        )}
      </Swiper>
    </div>
  );
}

export default memo(ExhibitionSlider);
