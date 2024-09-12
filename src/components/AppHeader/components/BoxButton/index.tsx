import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import S from './style.module.scss';

function BoxButton({ text, toUrl }: { text: string; toUrl: string }) {
  return (
    <NavLink className={S.component} to={toUrl}>
      {text}
    </NavLink>
  );
}

export default memo(BoxButton);
