import useDocumentTitle from '@/hooks/useDocumentTitle';
import { useIsContentPage } from '@/stores/isContentPage';
import { useIsLogin } from '@/stores/isLogin';
import { useEffect } from 'react';
import S from './style.module.scss';

export function Component() {
  useDocumentTitle('회원가입 | JJ.com');

  const { isContentPage, exitContentPage } = useIsContentPage(({ isContentPage, exitContentPage }) => ({
    isContentPage,
    exitContentPage,
  }));
  // 로그인 했는지 확인하는 상태
  const { isLogin } = useIsLogin(({ isLogin }) => ({
    isLogin,
  }));

  useEffect(() => {
    exitContentPage();
  }, []);

  return (
    <main id="page" className={S.component}>
      회원가입
    </main>
  );
}
