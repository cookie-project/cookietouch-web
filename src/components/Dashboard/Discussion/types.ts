import { DiscussionStyle } from "@/components/Dashboard/Discussion/styles";
import { IDiscussion } from "@/components/Dashboard/types";
import { WithStyles } from "@material-ui/core/styles/withStyles";

export interface IDiscussionProps {
  discussion: IDiscussion;
}

export interface IDiscussionState {
  //
}

export type DiscussionProps = IDiscussionProps & WithStyles<DiscussionStyle>;
