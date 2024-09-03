import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import S from './style.module.scss';

function BoxButton({ text }: { text: string }) {
  return (
    <NavLink className={S.component} to={'/login'}>
      {text}
    </NavLink>
  );
}

export default memo(BoxButton);
