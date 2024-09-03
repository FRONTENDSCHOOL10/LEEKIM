import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('프로필 편집 | JJ.com');

  return (
    <main id="page" className={S.component}>
      프로필 편집
    </main>
  );
}
