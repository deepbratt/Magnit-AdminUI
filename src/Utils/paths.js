import { lazy } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RestorePageRoundedIcon from "@material-ui/icons/RestorePageRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";



const Home = lazy(() => import("../Pages/home/index"));
const Login = lazy(() => import("../Pages/LoginPage"));
const Reset =lazy(()=> import("../Pages/LoginPage/ForgetPw"));
const ModeratePages = lazy(() => import("../Pages/ModeratePages/index"));
const ModerateSections = lazy(() => import("../Pages/ModerateSections"));
const Users = lazy(() => import("../Pages/users"));
const Settings = lazy(() => import("../Pages/settings"));

export const paths = {
  dashboard: "dashboard",
  pages: "pages",
  sections: "sections",
  users: "users",
  setting: "setting",
  login: "login",
  forgetPassword:"Forget-Pass"
};

export const routes = {
  dashboard: "/",
  pages: "/moderate-pages",
  sections: "/moderate-sections",
  users: "/users",
  settings: "/account-settings",
  login:"/login",
  forgetPassword:"/Forget-Pass"
};

export const pagesRoutes = {
  [paths.dashboard]: {
    name: "Dashboard",
    path: routes.dashboard,
    component: Home,
    icon: <DashboardIcon />,
  },
  [paths.pages]: {
    name: "Manage Pages",
    path: routes.pages,
    component: ModeratePages,
    icon: <RestorePageRoundedIcon />,
  },
  [paths.sections]: {
    name: "Manage Sections",
    path: routes.sections,
    component: ModerateSections,
    icon: <CreateRoundedIcon />,
  },
  [paths.users]: {
    name: "Manage Users",
    path: routes.users,
    component: Users,
    icon: <PersonAddIcon />,
  },
  [paths.settings]: {
    name: "Account Setting",
    path: routes.settings,
    component: Settings,
    icon: <AccountCircleIcon />,
  },
  [paths.login]: {
    name: "login",
    path: routes.login,
    component: Login,
  },
  [paths.forgetPassword]: {
    name: "Reset",
    path: routes.forgetPassword,
    component: Reset,
  },
  
};

