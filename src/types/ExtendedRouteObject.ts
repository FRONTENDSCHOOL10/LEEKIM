import { RouteObject } from 'react-router-dom';

export type ExtendedRouteObject = RouteObject & {
  text?: string;
  display?: boolean;
};
