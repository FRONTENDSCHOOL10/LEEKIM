import { ExtendedRouteObject } from '@/types/ExtendedRouteObject';

export function configRoutes(navigation: ExtendedRouteObject[]): ExtendedRouteObject[] {
  return navigation.map((item) => {
    const route: ExtendedRouteObject = { ...item };

    if (route.path === '/' || route.path === '') {
      route.index = true;
    }

    if (route.children) {
      route.children = configRoutes(route.children as ExtendedRouteObject[]);
    }

    delete route.text;
    delete route.display;

    return route;
  });
}
