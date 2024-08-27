import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import S from './style.module.scss';
import AppNav from './AppNav';

function AppHeader() {
  return (
    <header className={S.component}>
      <NavLink to="/">
        <h1>JJ.com</h1>
      </NavLink>
      <AppNav />
    </header>
  );
}

export default memo(AppHeader);
