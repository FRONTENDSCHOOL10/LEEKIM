import { memo } from 'react';
import S from './style.module.scss';
import { NavLink } from 'react-router-dom';

function Profile({ name, email, link }: { name: string; email: string; link: string }) {
  return (
    <div className={S.component}>
      <p>{name}</p>
      <p>{email}</p>
      <NavLink to={link}>GITHUB</NavLink>
    </div>
  );
}

export default memo(Profile);
