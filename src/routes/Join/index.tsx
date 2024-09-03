import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('회원가입 | JJ.com');

  return (
    <main id="page" className={S.component}>
      회원가입
    </main>
  );
}
