import { ReactElement } from 'react';
import S from './style.module.scss';

function MainTitle(): ReactElement {
  return (
    <div className={S.warpper}>
      <figure className={S.firstcomponent}>
        <img src="/ImgAssets/introducemain1.png" alt="" />
        <figcaption className={S.text1}>
          <p>발견의 장,</p>
          <p>창의성의 거점</p>
        </figcaption>
        <img src="/ImgAssets/introducemain2.png" alt="" />
        <figcaption className={S.text2}>
          <span>안녕하세요!</span>
        </figcaption>
        <figcaption className={S.text3}>
          <p>저희는</p>
          <p>졸전.COM입니다</p>
        </figcaption>
      </figure>
      <div className={S.subwarpper}>
        <div className={S.textwrapper}>
          <h2>
            <span className={S.bluetext}>졸전.COM</span>은
            <span>
              이렇게
              <a
                className={S.githubLink}
                href="https://github.com/FRONTENDSCHOOL10/LEEKIM"
                target="_blank"
                rel="noreferrer noopener"
              >
                github
                <img src="/Icon/IconGithubArrow.svg" alt="" />
              </a>
            </span>
            탄생했어요!
          </h2>
          <span>클라이언트 및 파트너 그리고 도움주신 기관</span>
          <figure className={S.aidagency}>
            <img src="/ImgAssets/likelion.png" alt="멋쟁이 사자처럼 로고" />
            <p>EUID</p>
            <img src="/ImgAssets/Subtract.svg" alt="계원예술대학교 로고" />
            <img src="/ImgAssets/yeongnam.svg" alt="영남대학교 로고" />
          </figure>
        </div>
        <figure className={S.secondcomponent}>
          <img src="/ImgAssets/introducemain3.png" alt="" />
          <figcaption className={S.text4}>
            <p>졸업 전시회는 이렇게 많은데</p>
            <p>왜 정보가 없지?</p>
          </figcaption>
          <figure className={S.thridcomponent}>
            <img src="/ImgAssets/introducemain4.png" alt="" />
            <figcaption className={S.text5}>
              <p>내가 보고 싶은</p>
              <p>졸업 전시만</p>
              <p>저장해 두고 싶어!</p>
            </figcaption>
            <img src="/ImgAssets/introducemain5.png" alt="" />
            <figcaption className={S.text6}>
              <p>약 200개의</p>
              <p>졸업 전시회 정보</p>
              <p>모아보기</p>
            </figcaption>
          </figure>
        </figure>
      </div>
    </div>
  );
}
export default MainTitle;
