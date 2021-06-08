
const pathIds = {
  home: "page",
  section: "section",
  homeSlider: "home-slider"
};

const pathRouting = {
  home: "/page",
  section: "/section",
  homeSlider: "/home-slider"
};

const pageRoutes = {
  [pathIds.page]: {
    path: pathRouting.page,
  },
  [pathIds.section]: {
    path: pathRouting.section,
  }
};

export { pageRoutes, pathIds, pathRouting };
