import { ReactElement } from 'react';
import S from './style.module.scss';
import { NavLink } from 'react-router-dom';

interface TagProps {
  text: string;
}

function Tag({ text }: TagProps): ReactElement {
  return (
    <NavLink to={'/'}>
      <span className={S.tag}>#{text}</span>
    </NavLink>
  );
}

export default Tag;
