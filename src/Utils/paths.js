import { lazy } from "react";

const Home = lazy(() => import("../pages/home"));

export const paths = {
  home: "home",
  dashboard: "dashboard",
};

export const routes = {
  home: "/",
  dashboard: "/dashboard",
};

export const pagesRoutes = {
  [paths.home]: {
    path: routes.home,
    component: Home,
  },
  [paths.dashboard]: {
    path: routes.dashboard,
    component: Home,
  },
};
