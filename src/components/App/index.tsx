import AuthProvider from "@/AuthContext";
import TopAppBar from "@/components/TopAppBar";
import withRoot from "@/withRoot";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { AppStyle, appStyles } from "./styles";

class App extends React.Component<WithStyles<AppStyle>, {}> {
  public render() {
    const { classes } = this.props;
    return (
      <AuthProvider>
        <div className={classes.root}>
          <TopAppBar />
        </div>
      </AuthProvider>
    );
  }
}

export default withRoot(withStyles(appStyles)(App));
