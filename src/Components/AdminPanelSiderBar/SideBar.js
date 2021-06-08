import React, { useState } from "react";
import {
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./useStyles";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerContext from "./DrawerContext";
import clsx from "clsx";
import { AppBarText } from "../../Utils/Text";
const SideBar = () => {
  const [open, setOpen] = useState(false);

  const {
    root,
    menuButton,
    hide,
    appBar,
    appBarShift,
    drawerHeader,
    contentShift,
    content,
  } = useStyles();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div>
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
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              className={clsx(menuButton, open && hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap>
              {AppBarText}
            </Typography>
          </Toolbar>
        </AppBar>
     <DrawerContext openDrawer={open} closeDrawer={handleDrawerClose} />
        <main
          className={clsx(content, {
            [contentShift]: open,
          })}
        >
          <div className={drawerHeader} />
        </main>
      </div>
    </div>
  );
};

export default SideBar;
