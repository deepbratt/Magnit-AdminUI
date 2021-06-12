import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PropTypes from "prop-types";
import { useState } from "react";
import { pagesRoutes } from "../../Utils/paths";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";
import LayoutStyles from "./style";

const Layout = ({ children }) => {
  const {
    root,
    appBar,
    appBarShift,
    drawer,
    drawerClose,
    drawerOpen,
    menuButton,
    hide,
    content,
    toolbar,
  } = LayoutStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const routeArray = Object.values(pagesRoutes);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(appBar, {
          [appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            aria-label="open drawer"
            className={clsx(menuButton, {
              [hide]: open,
            })}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Magnit DashBoard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(drawer, {
          [drawerOpen]: open,
          [drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [drawerOpen]: open,
            [drawerClose]: !open,
          }),
        }}
      >
        <div className={toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {routeArray.map((route, index) => (
            <NavLink
              style={{
                textDecoration: "none",
                display: "flex",
                color: "inherit",
              }}
              to={route.path}
              key={route.name}
            >
              <ListItem button>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => dispatch(logout())}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Account"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={content}>
        <div className={toolbar} />
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
