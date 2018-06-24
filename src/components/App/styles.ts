import { StyleRulesCallback } from "@material-ui/core";

export type AppStyle = "root";

export const appStyles: StyleRulesCallback<AppStyle> = theme => ({
  root: {
    flexGrow: 1
  }
});
