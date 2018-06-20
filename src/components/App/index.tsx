import AuthProvider from "@/AuthContext";
import withRoot from "@/withRoot";
import TopAppBar from "@components/TopAppBar";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import "./App.css";
import { style, styles } from "./styles";

class App extends React.Component<WithStyles<style>, {}> {
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

export default withRoot(withStyles(styles)(App));
