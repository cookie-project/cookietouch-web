import { StatsStyle } from "@/components/Stats/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

export interface IStatsProps {
  //
}

export interface IStatsState {
  totalUsers: number;
  usersConnected: number;
}

export type StatsProps = IStatsProps & WithStyles<StatsStyle>;
