import CommonHelmet from '@/components/CommonHelmet';
import S from './style.module.scss';

export function Component() {
  return (
    <main id="page" className={S.component}>
      <CommonHelmet pageTitle="나의 북마크" pageDescription="졸전 닷컴 북마크 페이지" />
    </main>
  );
}
