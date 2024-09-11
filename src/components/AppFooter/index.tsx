import { memo, useId } from 'react';
import S from './style.module.scss';
import Divider from './components/Divider';
import Profile from './components/Profile';
import FooterNavigation from './components/FooterNavigation';

function AppFooter() {
  const subscribeInputId = useId();

  const navigation = {
    com: {
      title: '졸전.COM',
      menu: [
        { text: '메인 페이지', path: '/' },
        { text: '프로젝트 소개', path: '/introduce' },
      ],
    },
    info: {
      title: '전시 정보',
      menu: [
        { text: '전체 전시', path: '/exhibition' },
        { text: '진행 중 전시', path: '/#exhibitionIng' },
        { text: '진행 예정 전시', path: '/#exhibitionSoon' },
        { text: '최근 본 전시', path: '/#exhibitionRecent' },
      ],
    },
    client: {
      title: '고객 지원',
      menu: [
        { text: '마이페이지', path: '/my/:userId' },
        { text: '전시 등록', path: '/registerExhi' },
        { text: '이용 약관', path: '/termsOfUse' },
      ],
    },
  };

  return (
    <footer className={S.component}>
      <div className={S.leftSide}>
        <form action="">
          <label htmlFor={subscribeInputId}>
            이메일을 등록하여
            <br />
            새로운 졸업 전시 알림을 받아보세요!
          </label>
          <br />
          {/* 구독하기 처리 로직 필요, 현재는 아무 기능없이 마크업만 완료된 상태 */}
          <input id={subscribeInputId} type="email" placeholder="email@gmail.com" />
          <br />
          <button type="submit">구독하기</button>
        </form>
        <img src="/Icon/TextLogo.svg" alt="졸전닷컴 글자 로고" />
      </div>
      <div className={S.rightSide}>
        <nav className={S.navigation}>
          <FooterNavigation element={navigation.com} />
          <FooterNavigation element={navigation.info} />
          <FooterNavigation element={navigation.client} />
        </nav>
        <Divider />
        <div>
          <p className={S.groupText}>TEAM.LEEKIM</p>
          <div className={S.profile}>
            <Profile name="김시원" email="rkdmf1306@gmail.com" link="https://github.com/chlyun" />
            <Profile name="김재림" email="jaerim1102@naver.com" link="https://github.com/jaerim1102" />
            <Profile name="이지수" email="szjslee@gmail.com" link="https://github.com/Jisoo0907" />
            <Profile name="이진용" email="yjy1480@gmail.com" link="https://github.com/Lee-Jinyong" />
          </div>
          <p className={S.rightText}>ⓒ 2024 JJ.COM of Korea Co., Ltd. All Rights Reserved. </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(AppFooter);
