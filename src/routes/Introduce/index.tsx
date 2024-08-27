import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('사이트 소개 | JJ.com');

  return (
    <main id="page" className={S.component}>
      사이트 소개 페이지
    </main>
  );
}
