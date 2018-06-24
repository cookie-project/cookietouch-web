import { StyleRulesCallback } from "@material-ui/core";

export type TopAppBarStyle = "root" | "flex" | "menuButton" | "appBar";

export const topAppBarStyles: StyleRulesCallback<TopAppBarStyle> = theme => ({
  appBar: {
    background: "linear-gradient(45deg, #1de099, #1dc8cd)"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    flexGrow: 1
  }
});
