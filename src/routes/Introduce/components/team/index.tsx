import { ReactElement } from 'react';
import Member from './member';
import S from './style.module.scss';
import siwon from '../../assets/siwon.jpg';
import jaerim from '../../assets/jaerim.jpg';
import jinyon from '../../assets/jinyon.png';
import jisoo from '../../assets/jisoo.jpg';

function Profile(): ReactElement {
  return (
    <div className={S.profile}>
      <div className={S.logo}>
        <img src={'/Icon/TextLogo.svg'} alt="졸전닷컴 로고" />
        <span>팀 소개</span>
      </div>
      <div className={S.profileui}>
        <div className={S.profileWapper}>
          <img src={siwon} alt="" className={S.profileimage} />
          <Member
            Name="김시원"
            job="Frontend Developer"
            description="Here we goMake it make it dropYeah my heart is like KING KONG"
            githublink="https://github.com/chlyun"
            maillink="rkdmf1306@gmail.com"
            contact=""
          />
        </div>
        <div className={S.profileWapper}>
          <img src={jisoo} alt="" className={S.profileimage} />
          <Member
            Name="이지수"
            job="Frontend Developer"
            description="Here we goMake it make it dropYeah my heart is like KING KONG"
            githublink="https://github.com/Jisoo0907"
            maillink="szjslee@gmail.com"
            contact=""
          />
        </div>
      </div>
      <div className={S.profileui}>
        <div className={S.profileWapper}>
          <img src={jaerim} alt="" className={S.profileimage} />
          <Member
            Name="김재림"
            job="Frontend Developer"
            description="Here we goMake it make it dropYeah my heart is like KING KONG"
            githublink="https://github.com/jaerim1102"
            maillink="jaerim1102@naver.com"
            contact=""
          />
        </div>
        <div className={S.profileWapper}>
          <img src={jinyon} alt="" className={S.profileimage} />
          <Member
            Name="이진용"
            job="Frontend Developer"
            description="Here we goMake it make it dropYeah my heart is like KING KONG"
            githublink="https://github.com/Lee-Jinyong"
            maillink="yjy1480@gmail.com"
            contact=""
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
