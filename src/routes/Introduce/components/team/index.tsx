import { ReactElement } from 'react';
import Member from './member';
import S from './style.module.scss';
import siwon from '../../assets/siwon.jpg';
import jaerim from '../../assets/jaerim.jpg';
import jinyon from '../../assets/jinyon.png';
import jisoo from '../../assets/jisoo.jpg';
import C from '../../assets/C.svg';
import J from '../../assets/J.svg';
import M from '../../assets/M.svg';
import logo from '../../assets/logo.svg';
import dot from '../../assets/dot.svg';

function Profile(): ReactElement {
  return (
    <div className={S.profile}>
      <div className={S.logo}>
        <img src={J} alt="" />
        <img src={J} alt="" />
        <img src={dot} alt="" />
        <img src={C} alt="" />
        <img src={logo} alt="" />
        <img src={M} alt="" />
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
            maillink="mailto:rkdmf1306@gmail.com"
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
            maillink="mailto:szjslee@gmail.com"
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
            maillink="mailto:jaerim1102@naver.com"
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
            maillink="mailto:yjy1480@gmail.com"
            contact=""
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
