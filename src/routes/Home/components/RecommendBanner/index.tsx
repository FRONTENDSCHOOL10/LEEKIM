import S from './style.module.scss';

function RecommendBanner() {
  return (
    <section className={S.component}>
      <div className={S.leftSide}>
        <figure className={S.top}>
          <img src="/src/routes/Home/assets/recommendImg01.png" alt="" />
          <figcaption>
            졸업 전시의
            <br />
            세계를 연결하다
          </figcaption>
        </figure>
        <figure className={S.bottom}>
          <img src="/src/routes/Home/assets/recommendImg02.png" alt="" />
          <figcaption>
            예술 명문,
            <br />
            계원예술대학교 전시 모음
          </figcaption>
        </figure>
      </div>
      <div className={S.rightSide}>
        <figure className={S.top}>
          <img src="/src/routes/Home/assets/recommendImg03.png" alt="" />
          <figcaption>
            지금 제일 인기 있는
            <br />
            졸업 전시
          </figcaption>
        </figure>
        <figure className={S.bottom}>
          <img src="/src/routes/Home/assets/recommendImg04.png" alt="" />
          <figcaption>
            집에서도 관람 가능!
            <br />
            온라인 졸업 전시 바로가기
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default RecommendBanner;
