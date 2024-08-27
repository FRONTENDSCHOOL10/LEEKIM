import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import S from './style.module.scss';

function AppFooter() {
  return (
    <footer className={S.component}>
      <NavLink to=""></NavLink>
    </footer>
  );
}

export default memo(AppFooter);
