import { discussionStyles } from "@/components/Dashboard/Discussion/styles";
import {
  DiscussionProps,
  IDiscussionProps,
  IDiscussionState
} from "@/components/Dashboard/Discussion/types";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";

class Discussion extends React.Component<DiscussionProps, IDiscussionState> {
  public render() {
    const { classes, discussion } = this.props;

    return <div className={classes.root}>{discussion.title}</div>;
  }
}

export default withStyles(discussionStyles)<IDiscussionProps>(Discussion);
