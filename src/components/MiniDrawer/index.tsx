import Dashboard from "@/components/Dashboard";
import Downloads from "@/components/Downloads";
import LangSelect from "@/components/LangSelect";
import Map from "@/components/Map";
import { miniDrawerStyles } from "@/components/MiniDrawer/styles";
import {
  IMiniDrawerProps,
  IMiniDrawerState,
  MiniDrawerProps
} from "@/components/MiniDrawer/types";
import Stats from "@/components/Stats";
import { signout } from "@/FirebaseHelpers";
import { MainConsumer } from "@/MainContext";
import Langs from "@/utils/langs";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import MapIcon from "@material-ui/icons/Map";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import * as React from "react";
import { Redirect } from "react-router-dom";

class MiniDrawer extends React.Component<MiniDrawerProps, IMiniDrawerState> {
  public state: IMiniDrawerState = {
    open: false,
    page: 0
  };

  public render() {
    const { classes, theme } = this.props;
    const { open, page } = this.state;

    return (
      <MainConsumer>
        {state => {
          if (state.user) {
            return (
              <div className={classes.root}>
                <AppBar
                  position="absolute"
                  className={classNames(
                    classes.appBar,
                    open && classes.appBarShift
                  )}
                >
                  <Toolbar disableGutters={!open}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={this.handleDrawerOpen}
                      className={classNames(
                        classes.menuButton,
                        open && classes.hide
                      )}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap={true}>
                      CookieTouch
                    </Typography>
                    <div className={classes.langSelect}>
                      <LangSelect />
                    </div>
                  </Toolbar>
                </AppBar>
                <Drawer
                  variant="permanent"
                  classes={{
                    paper: classNames(
                      classes.drawerPaper,
                      !open && classes.drawerPaperClose
                    )
                  }}
                  open={open}
                >
                  <div className={classes.toolbar}>
                    <IconButton onClick={this.handleDrawerClose}>
                      {theme && theme.direction === "rtl" ? (
                        <ChevronRightIcon />
                      ) : (
                        <ChevronLeftIcon />
                      )}
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    <ListItem
                      className={classNames(page === 0 && classes.currentTab)}
                      button={true}
                      onClick={this.changePage(0)}
                    >
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary={Langs.go("home")} />
                    </ListItem>
                    <ListItem
                      className={classNames(page === 1 && classes.currentTab)}
                      button={true}
                      onClick={this.changePage(1)}
                    >
                      <ListItemIcon>
                        <MapIcon />
                      </ListItemIcon>
                      <ListItemText primary={Langs.go("map")} />
                    </ListItem>
                    <ListItem
                      className={classNames(page === 2 && classes.currentTab)}
                      button={true}
                      onClick={this.changePage(2)}
                    >
                      <ListItemIcon>
                        <DownloadIcon />
                      </ListItemIcon>
                      <ListItemText primary={Langs.go("downloads")} />
                    </ListItem>
                    <ListItem
                      className={classNames(page === 3 && classes.currentTab)}
                      button={true}
                      onClick={this.changePage(3)}
                    >
                      <ListItemIcon>
                        <BubbleChartIcon />
                      </ListItemIcon>
                      <ListItemText primary={Langs.go("stats")} />
                    </ListItem>
                    <ListItem button={true} onClick={this.signout}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary={Langs.go("signout")} />
                    </ListItem>
                  </List>
                </Drawer>
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  {state.user.emailVerified ? (
                    <div>
                      {page === 0 && <Dashboard user={state.user} />}
                      {page === 1 && <Map />}
                      {page === 2 && <Downloads />}
                      {page === 3 && <Stats />}
                    </div>
                  ) : (
                    <Dashboard user={state.user} />
                  )}
                </main>
              </div>
            );
          } else {
            return <Redirect to="/" />;
          }
        }}
      </MainConsumer>
    );
  }

  private handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  private handleDrawerClose = () => {
    this.setState({ open: false });
  };

  private changePage = (page: number) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    this.setState({ page });
  };

  private signout = () => {
    signout();
  };
}

export default withStyles(miniDrawerStyles)<IMiniDrawerProps>(MiniDrawer);
