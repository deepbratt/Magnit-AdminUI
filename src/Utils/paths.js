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
const AdminPanelSlider = lazy(() =>
  import("../Sections/AdminPanelSliderSections/DisplayData")
);
const AdminPanelAwards = lazy(() =>
  import("../Sections/AdminPanelAwards/AwardsContext")
);
const AdminPanelBlogs = lazy(() =>
  import("../Sections/AdminPanelBlogs/BlogsContext")
);
const AdminPanelFooter = lazy(() =>
  import("../Sections/AdminPanelFooter/FooterContext")
);
const AdminPanelWorkflow = lazy(() =>
  import("../Sections/AdminPanelWorkflow/WorkFlowContext")
);
const AdminPanelJoinOurTeam = lazy(() =>
  import("../Sections/AdminPanelJoinTeam/JoinTeamContext")
);
const AdminPanelOurObjective = lazy(() =>
  import("../Sections/AdminPanelOurObjective/OurObjectiveContext")
);
const AdminPanelApp = lazy(() =>
  import("../Sections/AdminPanelApp/AppContext")
);
const AdminPanelReview = lazy(() =>
  import("../Sections/AdminPanelReviews/ReviewContext")
);
const AdminPanelSolutions = lazy(() =>
  import("../Sections/AdminPanelSolutions/SolutionsContext")
);
const AddServices = lazy(() => import("../components/ServicesSection"));
const OurWorkSection = lazy(() => import("../components/OurWorkSection"));
const AppSolutions = lazy(() => import("../components/AppSolutions"));
const BannersSection = lazy(() => import("../components/Banners"));
const HiringOptions = lazy(() => import("../components/HiringOptions"));
const JobBenefitsSection = lazy(() =>
  import("../components/JobBenefitsSection")
);
const OpportunitiesSection = lazy(() =>
  import("../components/OpportunitiesSection")
);
const TrainingAndCertification = lazy(() =>
  import("../components/TrainingAndCertification")
);
const BenifitsSection = lazy(() => import("../components/BenifitsSection"));
const FactsAboutUsSection = lazy(() => import("../components/FactsAboutUs"));
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
  blogs: "blogs",
  footer: "footer",
  workflow: "workflow",
  joinOurTeam: "joinOurTeam",
  ourObjective: "ourObjective",
  review: "review",
  app: "app",
  services: "services",
  ourWork: "ourWork",
  banner: "banner",
  hiringOptions: "hiringOptions",
  opportunities: "opportunities",
  trainingAndCertification: "trainingAndCertification",
  appSolutions: "appSolutions",
  benifits: "benifits",
  jobBenifits: "jobBenifits",
  factsAboutUs: "factsAboutUs",
  login: "login",
  forgotPassword: "forgot-password",
  resetPassword: "reset-password",
  caseStudies: "case-studies",
  howItWorks: "how-it-works",
  faqs: "faqs",
  solutions: "solutions"
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
  ourObjective: "/our-objective",
  review: "/review",
  app: "/admin-panel",
  services: "/services",
  ourWork: "/ourWork",
  banner: "/banner",
  hiringOptions: "/hiringOptions",
  opportunities: "/opportunities",
  trainingAndCertification: "/trainingAndCertification",
  appSolutions: "/appSolutions",
  benifits: "/benifits",
  jobBenifits: "/jobBenifits",
  factsAboutUs: "/factsAboutUs",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  caseStudies: "/moderate-sections/case-studies",
  howItWorks: "/moderate-sections/how-it-works",
  faqs: "/moderate-sections/faqs",
  solutions: "/solutions"
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
  [paths.ourObjective]: {
    path: routes.ourObjective,
    component: AdminPanelOurObjective,
  },
  [paths.app]: {
    path: routes.app,
    component: AdminPanelApp,
  },
  [paths.review]: {
    path: routes.review,
    component: AdminPanelReview,
  },
  [paths.services]: {
    path: routes.services,
    component: AddServices,
  },
  [paths.ourWork]: {
    path: routes.ourWork,
    component: OurWorkSection,
  },
  [paths.banner]: {
    path: routes.banner,
    component: BannersSection,
  },
  [paths.hiringOptions]: {
    path: routes.hiringOptions,
    component: HiringOptions,
  },
  [paths.opportunities]: {
    path: routes.opportunities,
    component: OpportunitiesSection,
  },
  [paths.trainingAndCertification]: {
    path: routes.trainingAndCertification,
    component: TrainingAndCertification,
  },
  [paths.appSolutions]: {
    path: routes.appSolutions,
    component: AppSolutions,
  },
  [paths.benifits]: {
    path: routes.benifits,
    component: BenifitsSection,
  },
  [paths.factsAboutUs]: {
    path: routes.factsAboutUs,
    component: FactsAboutUsSection,
  },
  [paths.jobBenifits]: {
    path: routes.jobBenifits,
    component: JobBenefitsSection,
  },
  [paths.caseStudies]: {
    path: routes.caseStudies,
    component: CaseStudies,
  },
  [paths.howItWorks]: {
    path: routes.howItWorks,
    component: HowItWorks,
  },
  [paths.faqs]: {
    path: routes.faqs,
    component: FAQs,
  },
  [paths.solutions]: {
    path: routes.solutions,
    component: AdminPanelSolutions,
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
