import { StyleRulesCallback } from "@material-ui/core";

export type MapStyle = "root";

export const mapStyles: StyleRulesCallback<MapStyle> = theme => ({
  root: {
    flexGrow: 1
  }
});
