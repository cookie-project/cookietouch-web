import { StyleRulesCallback } from "@material-ui/core";

export type LangSelectStyle = "root" | "formControl";

export const langSelectStyles: StyleRulesCallback<LangSelectStyle> = theme => ({
  formControl: {
    margin: theme.spacing.unit
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  }
});
