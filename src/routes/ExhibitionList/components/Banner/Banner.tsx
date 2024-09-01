import { memo } from 'react';
import S from './style.module.scss';

const Banner: React.FC = () => {
  return (
    <section className={S.component}>
      <div className={S.mainBanner}>
        <h1 className={S.bannerTitle}>졸업 전시</h1>
        <p>
          전국의 모든
          <br /> 졸업 전시를 만나보세요.
        </p>
      </div>
      <div className={S.subBanner}>
        <p>우리 학교, 우리 학과 전시회가 없다면?</p>
        <button type="button" className={S.bannerButton}>
          전시 등록 바로가기
        </button>
      </div>
    </section>
  );
};

export default memo(Banner);
