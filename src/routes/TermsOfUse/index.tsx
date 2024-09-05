import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('이용 약관 | JJ.com');

  return (
    <main id="page" className={S.component}>
      이용 약관
    </main>
  );
}
