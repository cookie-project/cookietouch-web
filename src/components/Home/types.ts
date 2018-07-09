import { HomeStyle } from "@/components/Home/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

export interface IHomeProps {
  //
}

export interface IHomeState {
  email: string;
  password: string;
  showPassword: boolean;
  error: string;
}

export type HomeProps = IHomeProps & WithStyles<HomeStyle>;
