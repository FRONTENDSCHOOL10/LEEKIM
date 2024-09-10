import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { configRoutes, getNavigationItems } from '@/utils';
import { ExtendedRouteObject } from './types/ExtendedRouteObject';
import RootLayout from '@/components/RootLayout';

import HomePage from '@/routes/Home';

/**@type {ExtendedRouteObject[]} */
const navigation: ExtendedRouteObject[] = [
  {
    text: '홈',
    path: '',
    // display: false,
    element: <HomePage />,
  },
  {
    text: '프로젝트 소개',
    path: '/introduce',
    lazy: () => import('@/routes/Introduce'),
  },
  {
    text: '졸업 전시',
    path: '/exhibition',
    lazy: () => import('@/routes/ExhibitionList'),
  },
  {
    text: '전시 상세 정보',
    path: '/exhibition/Detail/:exhiId',
    display: false,
    lazy: () => import('@/routes/ExhibitionDetail'),
  },
  {
    text: '로그인',
    path: '/login',
    display: false,
    lazy: () => import('@/routes/Login'),
  },
  {
    text: '회원가입',
    path: '/join',
    display: false,
    lazy: () => import('@/routes/Join'),
  },
  {
    text: '전시 등록',
    path: '/registerExhi',
    lazy: () => import('@/routes/RegisterExhibition'),
  },
  {
    text: '마이페이지',
    path: '/my/:userId',
    display: false,
    lazy: () => import('@/routes/MyPage'),
  },
  {
    text: '프로필 편집',
    path: '/editProfile/:userId',
    display: false,
    lazy: () => import('@/routes/EditProfile'),
  },
  {
    text: '북마크',
    path: '/bookmark/:userId',
    display: false,
    lazy: () => import('@/routes/Bookmark'),
  },
  {
    text: '검색 결과',
    path: '/searchResults/:searchWord',
    display: false,
    lazy: () => import('@/routes/SearchResults'),
  },
  {
    text: '이용 약관',
    path: '/termsOfUse',
    display: false,
    lazy: () => import('@/routes/TermsOfUse'),
  },
  {
    text: '전시 등록 관리',
    path: '/manageExhibition',
    display: false,
    lazy: () => import('@/routes/ManageExhibition'),
  },
  {
    text: '전시 등록 관리 상세',
    path: '/manageExhibition/detail/:exhiId',
    display: false,
    lazy: () => import('@/routes/ManageExhibitionDetail'),
  },
];

/**@type {RouteObject[]} */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: configRoutes(navigation),
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
