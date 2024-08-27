import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

function HomePage() {
  useDocumentTitle('미래를 엿보는 창, 졸전.com | JJ.com');

  return (
    <main id="page" className={S.component}>
      홈 페이지
    </main>
  );
}

export default HomePage;
