import { StyleRulesCallback } from "@material-ui/core";

export type style =
  | "root"
  | "appBar"
  | "appBarShift"
  | "menuButton"
  | "hide"
  | "drawerPaper"
  | "drawerPaperClose"
  | "toolbar"
  | "content";

const drawerWidth = 240;

export const styles: StyleRulesCallback<style> = theme => ({
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    }),
    zIndex: theme.zIndex.drawer + 1
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    }),
    width: `calc(100% - ${drawerWidth}px)`
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  drawerPaper: {
    position: "relative",
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    }),
    whiteSpace: "nowrap",
    width: drawerWidth
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  hide: {
    display: "none"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  root: {
    display: "flex",
    flexGrow: 1,
    height: 430,
    overflow: "hidden",
    position: "relative",
    zIndex: 1
  },
  toolbar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});
