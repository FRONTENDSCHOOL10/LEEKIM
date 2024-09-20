import S from './style.module.scss';
import Profile from './components/team';
import Description from './components/description';
import Link from './components/link';
import MainTitle from './components/mainTitle';
import CommonHelmet from '@/components/CommonHelmet';

export function Component() {
  return (
    <main className={S.component}>
      <CommonHelmet pageTitle="사이트 소개" pageDescription="졸전 닷컴을 소개하는 페이지" />
      <MainTitle />
      <Link />
      <Description />
      <Profile />
    </main>
  );
}
