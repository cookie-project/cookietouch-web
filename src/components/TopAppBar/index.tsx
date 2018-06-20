import { AuthConsumer } from "@/AuthContext";
import { signin, signout } from "@/FirebaseHelpers"
import Langs from "@/utils/langs";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import {
  WithStyles,
  withStyles
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import * as React from "react";
import { style, styles } from "./styles";
import "./TopAppBar.css";

interface IProps {
  test?: any;
}

interface IState {
  test?: any;
}

type Props = IProps & WithStyles<style>;

class TopAppBar extends React.Component<Props, IState> {

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              CookieTouch { Langs.go("test") }
            </Typography>
            <AuthConsumer>
              {ctx => ctx.user ?
                <React.Fragment>
                  <Typography variant="body1" color="inherit" className={classes.flex}>
                    { ctx.user.displayName }
                  </Typography>
                  <Button color="inherit" onClick={this.signOut}>Sign Out</Button>
                </React.Fragment>
                :
                <React.Fragment>
                  <Button color="inherit" onClick={this.signIn}>Sign In</Button>
                </React.Fragment>
              }
            </AuthConsumer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  private signIn = () => {
    signin("yovano_c@outlook.com", "XXXXXX");
  }

  private signOut = () => {
    signout();
  }
}

export default withStyles(styles)<IProps>(TopAppBar);
