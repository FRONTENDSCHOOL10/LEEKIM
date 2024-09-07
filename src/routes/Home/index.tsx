import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import Slogan from './components/Slogan/';
import MainPosterCard from './components/MainPosterCard';
import RecommendBanner from './components/RecommendBanner';

function HomePage() {
  useDocumentTitle('미래를 엿보는 창, 졸전.com | JJ.com');

  return (
    <main id="page" className={S.component}>
      <h1 className="sr-only">졸전닷컴 메인페이지</h1>
      <Slogan />
      <MainPosterCard />
      {/* 진행 중 전시 컴포넌트 */}
      {/* 진행 예정 전시 컴포넌트 */}
      <RecommendBanner />
      {/* 최근 본 전시 */}
    </main>
  );
}

export default HomePage;
