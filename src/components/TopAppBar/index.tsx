import { AuthConsumer } from "@/AuthContext";
import LangSelect from "@/components/LangSelect";
import { topAppBarStyles } from "@/components/TopAppBar/styles";
import {
  ITopAppBarProps,
  ITopAppBarState,
  TopAppBarProps
} from "@/components/TopAppBar/types";
import { signin, signout } from "@/FirebaseHelpers";
import Langs from "@/utils/langs";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";

class TopAppBar extends React.Component<TopAppBarProps, ITopAppBarState> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              CookieTouch
            </Typography>
            <LangSelect />
            <AuthConsumer>
              {ctx =>
                ctx.user ? (
                  <React.Fragment>
                    <Typography
                      variant="body1"
                      color="inherit"
                      className={classes.flex}
                    >
                      {ctx.user.email}
                    </Typography>
                    <Button color="inherit" onClick={this.signOut}>
                      Sign Out
                    </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button color="inherit" onClick={this.signIn}>
                      Sign In {Langs.go("test", "WORK", 42)}
                    </Button>
                  </React.Fragment>
                )
              }
            </AuthConsumer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  private signIn = () => {
    signin("test@cookie.com", "testpassword");
  };

  private signOut = () => {
    signout();
  };
}

export default withStyles(topAppBarStyles)<ITopAppBarProps>(TopAppBar);
