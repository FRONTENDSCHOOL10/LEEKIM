import { memo } from 'react';
import S from './style.module.scss';
import { NavLink } from 'react-router-dom';
import recommendImg01 from '/src/routes/Home/assets/recommendImg01.png';
import recommendImg02 from '/src/routes/Home/assets/recommendImg02.png';
import recommendImg03 from '/src/routes/Home/assets/recommendImg03.png';
import recommendImg04 from '/src/routes/Home/assets/recommendImg04.png';

function RecommendBanner() {
  const handleClick = () => {
    alert('해당 기능은 준비중입니다.');
    return;
  };

  return (
    <section className={S.component}>
      <div className={S.leftSide}>
        <figure className={S.top}>
          <NavLink to={'/'} onClick={() => handleClick()}>
            <img src={recommendImg01} alt="" />
            <figcaption>
              졸업 전시의
              <br />
              세계를 연결하다
            </figcaption>
          </NavLink>
        </figure>
        <figure className={S.bottom}>
          <NavLink to={'/'} onClick={() => handleClick()}>
            <img src={recommendImg02} alt="" />
            <figcaption>
              예술 명문,
              <br />
              계원예술대학교 전시 모음
            </figcaption>
          </NavLink>
        </figure>
      </div>
      <div className={S.rightSide}>
        <figure className={S.top}>
          <NavLink to={'/'} onClick={() => handleClick()}>
            <img src={recommendImg03} alt="" />
            <figcaption>
              지금 제일 인기 있는
              <br />
              졸업 전시
            </figcaption>
          </NavLink>
        </figure>
        <figure className={S.bottom}>
          <NavLink to={'/'} onClick={() => handleClick()}>
            <img src={recommendImg04} alt="" />
            <figcaption>
              집에서도 관람 가능!
              <br />
              온라인 졸업 전시 바로가기
            </figcaption>
          </NavLink>
        </figure>
      </div>
    </section>
  );
}

export default memo(RecommendBanner);
