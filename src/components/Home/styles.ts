import { StyleRulesCallback } from "@material-ui/core";

export type HomeStyle =
  | "root"
  | "card"
  | "title"
  | "logo"
  | "formControl"
  | "langSelect";

const logoSize = 150;

export const homeStyles: StyleRulesCallback<HomeStyle> = theme => ({
  card: {
    background: "rgba(0, 0, 0, .5)",
    color: "white",
    margin: 15,
    marginTop: logoSize,
    minWidth: 280,
    padding: 5
  },
  formControl: { margin: theme.spacing.unit },
  langSelect: {
    position: "absolute",
    right: 0,
    top: 0
  },
  logo: {
    left: "50%",
    marginLeft: -(logoSize / 2),
    position: "absolute",
    width: logoSize
  },
  root: {
    background:
      "lightgrey url(https://proxyconnection.touch.dofus.com/assets/ui/login/login_bg.jpg) no-repeat fixed center",
    flexGrow: 1,
    height: "100%"
  },
  title: {
    fontSize: 22,
    marginBottom: 16
  }
});
