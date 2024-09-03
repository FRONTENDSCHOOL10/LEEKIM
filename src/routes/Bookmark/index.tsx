import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('나의 북마크 | JJ.com');

  return (
    <main id="page" className={S.component}>
      북마크
    </main>
  );
}
