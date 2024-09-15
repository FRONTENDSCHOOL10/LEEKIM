import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import Slogan from './components/Slogan/';
import MainPosterCard from './components/MainPosterCard';
import RecommendBanner from './components/RecommendBanner';
import { useIsContentPage } from '@/stores/isContentPage';
import { useIsLogin } from '@/stores/isLogin';
import { useEffect } from 'react';
import IngExhibition from './components/IngExhibition';
import SoonExhibition from './components/SoonExhibition';
import RecentlyViewedExhibition from './components/RecentlyViewedExhibition';

function HomePage() {
  useDocumentTitle('미래를 엿보는 창, 졸전.com | JJ.com');

  const { isContentPage, enterContentPage } = useIsContentPage(({ isContentPage, enterContentPage }) => ({
    isContentPage,
    enterContentPage,
  }));
  // 로그인 했는지 확인하는 상태
  const { isLogin } = useIsLogin(({ isLogin }) => ({
    isLogin,
  }));

  useEffect(() => {
    enterContentPage();
  }, []);

  return (
    <main id="page" className={S.component}>
      <h1 className="sr-only">졸전닷컴 메인페이지</h1>
      <Slogan />
      <MainPosterCard />
      <IngExhibition />
      <SoonExhibition />
      <RecommendBanner />
      <RecentlyViewedExhibition />
    </main>
  );
}

export default HomePage;
