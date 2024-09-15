import { memo, useEffect } from 'react';
import S from './style.module.scss';
import AppNav from './components/AppNav';
import { useIsLogin } from '@/stores/isLogin';

function AppHeader() {
  // 로그인 했는지 확인하는 상태
  const { isLogin, login, logout } = useIsLogin(({ isLogin, login, logout }) => ({
    isLogin,
    login,
    logout,
  }));
  useEffect(() => {
    if (sessionStorage.getItem('userId') === null) {
      sessionStorage.setItem('userId', '');
    }

    if (sessionStorage.getItem('recentlyViewed') === null) {
      sessionStorage.setItem('recentlyViewed', '');
    }

    if (sessionStorage.getItem('userId') !== '') {
      login();
    } else {
      logout();
    }
  }, []);

  return (
    <header className={S.component}>
      <AppNav />
    </header>
  );
}

export default memo(AppHeader);
