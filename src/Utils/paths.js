import { lazy } from "react";

const Home = lazy(() => import("../Pages/home/index"));

export const paths = {
  home: "home",
  dashboard: "dashboard",
  login: "login",
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
