import { homeStyles } from "@/components/Home/styles";
import { HomeProps, IHomeProps, IHomeState } from "@/components/Home/types";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";

class Home extends React.Component<HomeProps, IHomeState> {
  public render() {
    const { classes } = this.props;

    return <div className={classes.root}>Home</div>;
  }
}

export default withStyles(homeStyles)<IHomeProps>(Home);
