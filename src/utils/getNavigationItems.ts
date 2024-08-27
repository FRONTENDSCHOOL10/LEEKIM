import { ExtendedRouteObject } from '@/types/ExtendedRouteObject';

export function getNavigationItems(navigation: ExtendedRouteObject[]): ExtendedRouteObject[] {
  const filtered = navigation.filter((item) => item.display === undefined);
  const navigationItems = filtered.map(({ path, text }) => ({ path, text }));
  return navigationItems;
}
