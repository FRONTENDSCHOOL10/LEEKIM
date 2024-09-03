import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('마이페이지 | JJ.com');

  return (
    <main id="page" className={S.component}>
      마이페이지
    </main>
  );
}
