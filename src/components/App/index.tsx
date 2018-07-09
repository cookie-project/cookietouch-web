import { AppStyle, appStyles } from "@/components/App/styles";
import Home from "@/components/Home";
import MiniDrawer from "@/components/MiniDrawer";
import MainProvider from "@/MainContext";
import withRoot from "@/withRoot";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component<WithStyles<AppStyle>, {}> {
  public render() {
    const { classes } = this.props;
    return (
      <MainProvider>
        <BrowserRouter>
          <div className={classes.root}>
            <Route path="/" component={Home} exact={true} />
            <Route path="/panel" component={MiniDrawer} exact={true} />
          </div>
        </BrowserRouter>
      </MainProvider>
    );
  }
}

export default withRoot(withStyles(appStyles)(App));
