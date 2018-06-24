import { TopAppBarStyle } from "@components/TopAppBar/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

export interface ITopAppBarProps {
  //
}

export interface ITopAppBarState {
  //
}

export type TopAppBarProps = ITopAppBarProps & WithStyles<TopAppBarStyle>;
