import useDocumentTitle from '@/hooks/useDocumentTitle';
import S from './style.module.scss';
import Profile from './components/team';
import Description from './components/description';
import Link from './components/link';
import MainTitle from './components/mainTitle';

export function Component() {
  useDocumentTitle('사이트 소개 | JJ.com');

  return (
    <main className={S.component}>
      <MainTitle />
      <Link />
      <Description />
      <Profile />
    </main>
  );
}
