import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('전시 상세 정보 | JJ.com');

  return (
    <main id="page" className={S.component}>
      전시 상세 정보 페이지
    </main>
  );
}
