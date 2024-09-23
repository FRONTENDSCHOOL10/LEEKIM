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
            job="Frontend Developer & API Manager"
            description="어려웠지만 완성해서 뿌듯합니다"
            githublink="https://github.com/chlyun"
            maillink="rkdmf1306@gmail.com"
            contact=""
          />
        </div>
        <div className={S.profileWapper}>
          <img src={jisoo} alt="" className={S.profileimage} />
          <Member
            Name="이지수"
            job="Frontend Developer & organize documents"
            description="한 사람 몫을 할 때까지 오늘부로 정권 찌르기 93일차..."
            githublink="https://github.com/Jisoo0907"
            maillink="szjslee@gmail.com"
            contact="https://kellyjs.tistory.com/"
          />
        </div>
      </div>
      <div className={S.profileui}>
        <div className={S.profileWapper}>
          <img src={jaerim} alt="" className={S.profileimage} />
          <Member
            Name="김재림"
            job="Frontend Developer & Designer"
            description="좋은 팀원분들 덕에 프로젝트 잘 마무리한 것 같아서 감사합니다!
            프로젝트는 끝나지만 우리 우정은 영원히~ >,< 졸전닷컴은 100억을 벌 수 있는 기획이다
            "
            githublink="https://github.com/jaerim1102"
            maillink="jaerim1102@naver.com"
            contact="https://velog.io/@jaaerim/"
          />
        </div>
        <div className={S.profileWapper}>
          <img src={jinyon} alt="" className={S.profileimage} />
          <Member
            Name="이진용"
            job="Frontend Developer & Leader"
            description="언젠가 코딩을 통한 일확천금을 노리는 주니어 개발자"
            githublink="https://github.com/Lee-Jinyong"
            maillink="yjy1480@gmail.com"
            contact="https://jinyon.tistory.com/"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
