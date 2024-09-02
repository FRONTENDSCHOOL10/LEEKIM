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
  // 콘텐츠 페이지인지 확인하는 상태(로그인 관련 페이지가 아닌지 확인)
  const [isContentPage, setIsContentPage] = useState(true);
  // 로그인 했는지 확인하는 상태
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    //로그인, 회원가입 페이지인지 체크 후 헤더 형식 변경을 위한 코드
    //로그인 validation 구현 후 수정해야 함
    if (isContentPage) {
      setIsContentPage(true);
    } else {
      setIsContentPage(false);
    }
  }, []);

  return (
    <nav>
      <ul className={S.component}>
        {isContentPage ? (
          // 콘텐츠 페이지일 때
          <li className={S.HomeButtonContent}>
            <HomeButton imgSrc={'/Icon/Logo.svg'} />
          </li>
        ) : (
          // 콘텐츠 페이지가 아닐 때(로그인 관련 페이지)
          <li className={S.HomeButtonLogin}>
            <HomeButton imgSrc={'/Icon/Logo.svg'} />
          </li>
        )}
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
        {/* 콘텐츠 페이지이고, 로그인 상태일 때 */}
        {isContentPage && isAuth ? (
          <li className={S.formWrapper}>
            <ul>
              <li>
                <SearchBox />
              </li>
              <li>
                <BoxButton text={'마이페이지'} />
              </li>
            </ul>
          </li>
        ) : null}
        {/* 콘텐츠 페이지이고, 게스트 상태일 때 */}
        {isContentPage && !isAuth ? (
          <li className={S.formWrapper}>
            <ul>
              <li>
                <SearchBox />
              </li>
              <li>
                <BoxButton text={'로그인'} />
              </li>
            </ul>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default memo(GlobalNav);
