import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('로그인 | JJ.com');

  return (
    <main id="page" className={S.component}>
      로그인
    </main>
  );
}
