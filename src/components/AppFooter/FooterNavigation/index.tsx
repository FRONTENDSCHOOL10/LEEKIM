import { memo } from 'react';
import S from './style.module.scss';
import { NavLink } from 'react-router-dom';

function FooterNavigation({ element }: { element: { title: string; menu: { text: string; path: string }[] } }) {
  return (
    <div className={S.component}>
      <p>{element.title}</p>
      <ul>
        {element.menu.map(({ text, path }) =>
          path ? (
            <li key={path}>
              <NavLink to={path}>{text}</NavLink>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default memo(FooterNavigation);
