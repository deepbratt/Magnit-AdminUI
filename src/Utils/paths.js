import { lazy } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RestorePageRoundedIcon from "@material-ui/icons/RestorePageRounded";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
const Home = lazy(() => import("../pages/home"));
const ModeratePages = lazy(() => import("../pages/ModeratePages"));
const ModerateSections = lazy(() => import("../pages/ModerateSections"));
const Users = lazy(() => import("../pages/users"));
const Settings = lazy(() => import("../pages/settings"));
const AdminPanelSlider = lazy(() => import("../pages/AdminPanelSlider/Container"));
const AdminPanelAwards = lazy(() => import("../pages/AdminPanelAwards/Container"));
const AdminPanelBlogs = lazy(() => import("../pages/AdminPanelBlogs/Container"));
const AdminPanelFooter = lazy(() => import("../pages/AdminPanelFooter/Container"));
const AdminPanelWorkflow = lazy(() => import("../pages/AdminPanelWorkflow/Container"));
const AdminPanelJoinOurTeam = lazy(() => import("../pages/AdminPanelJoinOurTeam/Container"));
const Login = lazy(() => import("../pages/Login"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));

export const paths = {
  dashboard: "dashboard",
  pages: "pages",
  sections: "sections",
  users: "users",
  setting: "setting",
  homeSlider: "home-slider",
  awards: "awards",
  blogs: "blogs",
  footer: "footer",
  workflow: "workflow",
  joinOurTeam: "joinOurTeam",
  login: "login",
  forgotPassword: "forgot-password",
  resetPassword: "reset-password",
};

export const routes = {
  dashboard: "/",
  pages: "/moderate-pages",
  sections: "/moderate-sections",
  users: "/users",
  settings: "/account-settings",
  homeSlider: "/home-slider",
  awards: "/awards",
  blogs: "/blogs",
  footer: "/footer",
  workflow: "/workflow",
  joinOurTeam: "/join-our-team",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
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
  [paths.homeSlider]: {
    path: routes.homeSlider,
    component: AdminPanelSlider,
  },
  [paths.awards]: {
    path: routes.awards,
    component: AdminPanelAwards,
  },
  [paths.blogs]: {
    path: routes.blogs,
    component: AdminPanelBlogs,
  },
  [paths.footer]: {
    path: routes.footer,
    component: AdminPanelFooter,
  },
  [paths.workflow]: {
    path: routes.workflow,
    component: AdminPanelWorkflow,
  },
  [paths.joinOurTeam]: {
    path: routes.joinOurTeam,
    component: AdminPanelJoinOurTeam,
  },
};

export const publicRoutes = {
  [paths.login]: {
    name: "Login",
    path: routes.login,
    component: Login,
  },
  [paths.forgotPassword]: {
    name: "Forgot Password",
    path: routes.forgotPassword,
    component: ForgetPassword,
  },
  [paths.resetPassword]: {
    name: "Reset Password",
    path: routes.resetPassword,
    component: ResetPassword,
  },
};


