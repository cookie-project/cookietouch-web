import { downloadsStyles } from "@/components/Downloads/styles";
import {
  DownloadsProps,
  IDownloadsProps,
  IDownloadsState
} from "@/components/Downloads/types";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import * as React from "react";

class Downloads extends React.Component<DownloadsProps, IDownloadsState> {
  public componentDidMount() {
    axios.get("/alpha-mac.json").then(res => {
      // tslint:disable-next-line:no-console
      console.log(res.data);
    });
  }
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container={true} spacing={8}>
          <Grid item={true} sm={4} xs={12}>
            TEST
          </Grid>
          <Grid item={true} sm={4} xs={12}>
            TEST
          </Grid>
          <Grid item={true} sm={4} xs={12}>
            TEST
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(downloadsStyles)<IDownloadsProps>(Downloads);
