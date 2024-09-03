import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('검색 결과 | JJ.com');

  return (
    <main id="page" className={S.component}>
      검색 결과
    </main>
  );
}
