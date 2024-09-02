import { memo } from 'react';
import S from './style.module.scss';
import AppNav from './components/AppNav';

function AppHeader() {
  return (
    <header className={S.component}>
      <AppNav />
    </header>
  );
}

export default memo(AppHeader);
