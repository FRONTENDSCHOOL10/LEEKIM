import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '@/router';
import S from './style.module.scss';

function GlobalNav() {
  const [navigationList] = useState(navigationItems);

  return (
    <nav className={S.component}>
      <ul>
        {navigationList.map(({ path, text }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) => {
                // 해당 메뉴가 활성화 된 상태인지 체크
                return isActive ? S.active : undefined;
              }}
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(GlobalNav);
