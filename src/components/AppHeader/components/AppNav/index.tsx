import { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '@/router';
import { ExtendedRouteObject } from '@/types/ExtendedRouteObject';
import S from './style.module.scss';
import HomeButton from '../HomeButton';
import SearchBox from '../SearchBox';
import BoxButton from '../BoxButton';

function GlobalNav() {
  const [navigationList] = useState<ExtendedRouteObject[]>(navigationItems);
  const [isContentPage, setIsContentPage] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    //로그인, 회원가입 페이지인지 체크 후 헤더 형식 변경을 위한 코드
    //로그인 validation 구현 후 수정해야 함
    if (true) {
      setIsContentPage(true);
    } else {
      setIsContentPage(false);
    }
  }, []);

  return (
    <nav>
      <ul className={S.component}>
        <li className={S.HomeButton}>
          {isContentPage ? <HomeButton imgSrc={'/Icon/Logo.svg'} /> : <HomeButton imgSrc={'/JJcom.svg'} />}
        </li>
        <li className={S.menuButtonWrapper}>
          <ul>
            {navigationList.map(({ path, text }) =>
              path ? (
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
              ) : null
            )}
          </ul>
        </li>
        <li className={S.formWrapper}>
          <ul>
            <li>
              <SearchBox />
            </li>
            <li>{isAuth ? <BoxButton text={'마이페이지'} /> : <BoxButton text={'로그인'} />}</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default memo(GlobalNav);
