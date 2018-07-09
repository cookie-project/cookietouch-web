import { DashboardStyle } from "@/components/Dashboard/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

export interface IDiscussion {
  title: string;
  content: string;
}

export interface IDashboardProps {
  user: firebase.User;
}

export interface IDashboardState {
  discussions: IDiscussion[];
  name: string | null;
  email: string | null;
  password: string;
  errorProfile: string;
  errorPassword: string;
}

export type DashboardProps = IDashboardProps & WithStyles<DashboardStyle>;
