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
const CaseStudies = lazy(() => import("../Sections/CaseStudies/index"));
const HowItWorks = lazy(() => import("../Sections/HowItWorks/index"));
const FAQs = lazy(() => import("../Sections/FAQs/index"));
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
  login: "login",
  forgotPassword: "forgot-password",
  resetPassword: "reset-password",
  caseStudies:"case-studies",
  howItWorks:"how-it-works",
  howItWorks:"faqs",
};

export const routes = {
  dashboard: "/",
  pages: "/moderate-pages",
  sections: "/moderate-sections",
  users: "/users",
  settings: "/account-settings",
  homeSlider: "/home-slider",
  awards: "/awards",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  caseStudies:"/moderate-sections/case-studies",
  howItWorks:"/moderate-sections/how-it-works",
  faqs:"/moderate-sections/faqs",
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
    name: "Section/HomeSlider",
    path: routes.homeSlider,
    component: AdminPanelSlider,
  },
  [paths.awards]: {
    name: "Section/Awards",
    path: routes.awards,
    component: AdminPanelAwards,
  },
  [paths.caseStudies]: {
    name: "Section/caseStudies",
    path: routes.caseStudies,
    component: CaseStudies,
  },
  [paths.howItWorks]: {
    name: "Section/howItWorks",
    path: routes.howItWorks,
    component: HowItWorks,
  },
  [paths.howItWorks]: {
    name: "Section/faqs",
    path: routes.faqs,
    component: FAQs,
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
