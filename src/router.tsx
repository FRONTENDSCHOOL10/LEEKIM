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
    text: '사이트 소개',
    path: '/introduce',
    lazy: () => import('@/routes/Introduce'),
  },
  {
    text: '전시 목록',
    path: '/exhibition',
    lazy: () => import('@/routes/ExhibitionList'),
  },
  {
    text: '로그인',
    path: '/login',
    lazy: () => import('@/routes/Login'),
  },
  {
    text: '전시 상세 정보',
    path: '/exhibition/Detail/:exhiId',
    display: false,
    lazy: () => import('@/routes/ExhibitionDetail'),
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
