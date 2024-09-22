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
import CommonHelmet from '@/components/CommonHelmet';

function HomePage() {
  const { enterContentPage } = useIsContentPage(({ enterContentPage }) => ({
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
      <CommonHelmet
        pageTitle="미래를 엿보는 창, 졸전.com"
        pageDescription="다양한 졸업 전시회 정보를 제공해주는 졸전닷컴"
      />

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
