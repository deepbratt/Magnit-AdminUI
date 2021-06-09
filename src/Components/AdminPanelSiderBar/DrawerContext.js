import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import useStyles from "./useStyles";
import Logo from "../../assets/MagnitLogo.png";
const DrawerContext = ({ openDrawer, closeDrawer }) => {
  const { drawer, drawerHeader, drawerPaper } = useStyles();
  const theme = useTheme();
  return (
    <>
      <Drawer
        className={drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: drawerPaper,
        }}
      >
        <div className={drawerHeader}>
          <img width="130px" alt="logo" src={Logo} />
          <IconButton onClick={closeDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['DashBoard', 'Moderate Pages','Sections','Settings'].map((sidebarName, index) =>(

                  <ListItem style={{ padding: "20px" }} button key={index}>
                    <Typography variant="h6">{sidebarName}</Typography>
                  </ListItem>
         
            ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default DrawerContext;
