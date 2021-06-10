import { lazy } from "react";



const Home = lazy(() => import("../Pages/home/index"));
const Login = lazy(() => import("../Pages/LoginPage/index"));
const ForgetPs = lazy(() => import("../Pages/LoginPage/ForgetPw"));

export const paths = {
  home: "home",
  dashboard: "dashboard",
  login: "login",
  forgetPassword:"Forget-Pass"
};

export const routes = {
  home: "/",
  dashboard: "/dashboard",
  login:"/login",
  forgetPassword:"/Forget-Pass"
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
  [paths.dashboard]: {
    path: routes.login,
    component: Login,
  },
  [paths.dashboard]: {
    path: routes.forgetPassword,
    component: ForgetPs,
  },
  
};
