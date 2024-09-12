import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '@/router';
import { ExtendedRouteObject } from '@/types/ExtendedRouteObject';
import S from './style.module.scss';
import HomeButton from '../HomeButton';
import SearchBox from '../SearchBox';
import BoxButton from '../BoxButton';
import { useIsLogin } from '@/stores/isLogin';
import { useIsContentPage } from '@/stores/isContentPage';

function GlobalNav() {
  const [navigationList] = useState<ExtendedRouteObject[]>(navigationItems);
  // 콘텐츠 페이지인지 확인하는 상태(로그인 관련 페이지가 아닌지 확인)
  const { isContentPage } = useIsContentPage(({ isContentPage }) => ({
    isContentPage,
  }));
  // 로그인 했는지 확인하는 상태
  const { isLogin } = useIsLogin(({ isLogin }) => ({
    isLogin,
  }));

  return (
    <nav className={S.component}>
      <h2 className="sr-only">메뉴 내비게이션</h2>
      <ul className={S.navigationWrapper}>
        {isContentPage ? (
          // 콘텐츠 페이지일 때
          <li className={S.HomeButtonContent}>
            <HomeButton imgSrc={'/Icon/Logo.svg'} />
          </li>
        ) : (
          // 콘텐츠 페이지가 아닐 때(로그인 관련 페이지)
          <li className={S.HomeButtonLogin}>
            <HomeButton imgSrc={'/Icon/TextLogo.svg'} />
          </li>
        )}
        <li className={S.menuButtonWrapper}>
          <ul>
            {navigationList.map(({ path, text }) =>
              path ? (
                <li key={path}>
                  <NavLink to={path}>{text}</NavLink>
                </li>
              ) : null
            )}
          </ul>
        </li>
        {/* 콘텐츠 페이지이고, 로그인 상태일 때 */}
        {isContentPage && isLogin ? (
          <li className={S.formWrapper}>
            <ul>
              <li>
                <SearchBox />
              </li>
              <li>
                <BoxButton text={'내 정보'} />
              </li>
            </ul>
          </li>
        ) : null}
        {/* 콘텐츠 페이지이고, 게스트 상태일 때 */}
        {isContentPage && !isLogin ? (
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
