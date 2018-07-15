import { homeStyles } from "@/components/Home/styles";
import { HomeProps, IHomeProps, IHomeState } from "@/components/Home/types";
import LangSelect from "@/components/LangSelect";
import { signin, signup } from "@/FirebaseHelpers";
import { MainConsumer } from "@/MainContext";
import Langs from "@/utils/langs";
import icon from "@components/Home/icon.png";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as React from "react";
import { Redirect } from "react-router";

class Home extends React.Component<HomeProps, IHomeState> {
  public state: IHomeState = {
    email: "",
    error: "",
    password: "",
    showPassword: false
  };
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MainConsumer>
          {state => {
            if (state.user) {
              return <Redirect to="/panel" />;
            } else {
              return (
                <Grid container={true} spacing={0} justify="center">
                  <div className={classes.langSelect}>
                    <LangSelect />
                  </div>
                  <Grid item={true} xs={"auto"} md={3}>
                    <img className={classes.logo} src={icon} />
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="inherit"
                          style={{ textAlign: "center" }}
                        >
                          CookieTouch
                        </Typography>
                        <FormControl
                          fullWidth={true}
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <Input
                            autoFocus={true}
                            id="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange("email")}
                            fullWidth={true}
                          />
                        </FormControl>
                        <FormControl
                          fullWidth={true}
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor="password">
                            {Langs.go("password")}
                          </InputLabel>
                          <Input
                            id="password"
                            type={this.state.showPassword ? "text" : "password"}
                            value={this.state.password}
                            onChange={this.handleChange("password")}
                            fullWidth={true}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={this.handleClickShowPasssword}
                                  onMouseDown={this.handleMouseDownPassword}
                                >
                                  {this.state.showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        {this.state.error !== "" && (
                          <Typography
                            variant="body1"
                            style={{ color: "red", marginTop: 20 }}
                          >
                            {this.state.error}
                          </Typography>
                        )}
                        <Typography
                          color="inherit"
                          variant="caption"
                          style={{ marginTop: 20 }}
                        >
                          {Langs.go("signinInfos")}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Grid
                          container={true}
                          spacing={0}
                          justify="space-around"
                        >
                          <Button
                            size="small"
                            variant="raised"
                            onClick={this.signin}
                          >
                            {Langs.go("signin")}
                          </Button>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              );
            }
          }}
        </MainConsumer>
      </div>
    );
  }

  private handleChange = (prop: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const k = prop as keyof IHomeState;
    const v: any = event.target.value;
    this.setState({ [k]: v } as Pick<IHomeState, keyof IHomeState>);
  };

  private handleMouseDownPassword = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  private handleClickShowPasssword = () => {
    this.setState(prev => ({ showPassword: !prev.showPassword }));
  };

  private signin = async () => {
    const email = this.state.email;
    const password = this.state.password;
    try {
      this.setState({ email: "", password: "" });
      await signin(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email": {
          this.setState({
            error: Langs.go("invalidEmail")
          });
          return;
        }
        case "auth/wrong-password": {
          this.setState({
            error: Langs.go("wrongPassword")
          });
          return;
        }
        default:
          break;
      }
      // ECHEC CONNECTION
      try {
        await signup(email, password);
      } catch (errorSignup) {
        // ECHEC SIGNUP
        // tslint:disable-next-line:no-console
        console.log(error.message);
      }
    }
  };

  /*
  private forgotPassword = () => {
    firebase.auth().sendPasswordResetEmail)
  }
  */
}

export default withStyles(homeStyles)<IHomeProps>(Home);
