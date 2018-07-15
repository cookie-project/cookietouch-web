import Discussion from "@/components/Dashboard/Discussion";
import { dashboardStyles } from "@/components/Dashboard/styles";
import {
  DashboardProps,
  IDashboardProps,
  IDashboardState
} from "@/components/Dashboard/types";
import Langs from "@/utils/langs";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import * as React from "react";

class Dashboard extends React.Component<DashboardProps, IDashboardState> {
  public state: IDashboardState = {
    discussions: [],
    email: this.props.user.email,
    errorPassword: "",
    errorProfile: "",
    name: this.props.user.displayName,
    password: ""
  };

  public componentDidMount() {
    axios
      .get("https://forum.cookietouch.com/api/discussions")
      .then(response => {
        // tslint:disable-next-line:no-console
        console.log(response.data);
      });
  }

  public render() {
    const { classes, user } = this.props;
    const { discussions, email, name, password } = this.state;

    return (
      <div className={classes.root}>
        {!user.emailVerified && (
          <Paper
            style={{
              background: "rgba(255, 0, 0, .3)",
              marginBottom: 30,
              padding: 20
            }}
          >
            <Typography variant="headline">
              {Langs.go("activateTitle", name)}
            </Typography>
            <Typography variant="body1">
              {Langs.go("activateMessage")}
            </Typography>
            <Button
              style={{ marginTop: 20 }}
              variant="raised"
              color="primary"
              onClick={this.sendActivationEmail(user)}
            >
              {Langs.go("sendActivationEmail")}
            </Button>
          </Paper>
        )}
        <Grid container={true} spacing={8}>
          <Grid item={true} md={6} xs={12}>
            <Grid container={true} spacing={8}>
              <Grid item={true} md={6} xs={12}>
                <Paper style={{ margin: 10, padding: 10 }}>
                  <TextField
                    autoFocus={true}
                    margin="dense"
                    id="name"
                    name="name"
                    label={Langs.go("name")}
                    value={name ? name : ""}
                    fullWidth={true}
                    onChange={this.updateName}
                    type="text"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    autoFocus={true}
                    margin="dense"
                    id="email"
                    name="email"
                    label={Langs.go("email")}
                    value={email ? email : ""}
                    fullWidth={true}
                    onChange={this.updateEmail}
                    type="email"
                    InputLabelProps={{ shrink: true }}
                  />
                  <Button
                    style={{ marginTop: 20 }}
                    color="primary"
                    variant="raised"
                    onClick={this.updateProfile}
                  >
                    {Langs.go("update")}
                  </Button>
                  {this.state.errorProfile !== "" && (
                    <Typography variant="body1" style={{ color: "red" }}>
                      {this.state.errorProfile}
                    </Typography>
                  )}
                </Paper>
              </Grid>
              <Grid item={true} md={6} xs={12}>
                <Paper style={{ margin: 10, padding: 10 }}>
                  <TextField
                    autoFocus={true}
                    margin="dense"
                    id="password"
                    name="password"
                    label={Langs.go("password")}
                    value={password ? password : ""}
                    fullWidth={true}
                    onChange={this.updatePassword}
                    type="password"
                    InputLabelProps={{ shrink: true }}
                  />
                  <Button
                    style={{ marginTop: 20 }}
                    color="primary"
                    variant="raised"
                    onClick={this.sendUpdatePassword}
                  >
                    {Langs.go("update")}
                  </Button>
                  {this.state.errorPassword !== "" && (
                    <Typography variant="body1" style={{ color: "red" }}>
                      {this.state.errorPassword}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} md={6} xs={12}>
            <List>
              {discussions.map((d, index) => (
                <ListItem key={index}>
                  <Discussion discussion={d} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }

  private sendActivationEmail = (user: firebase.User) => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    user.sendEmailVerification();
  };

  private updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  };

  private updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  private updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  private updateProfile = (event: React.MouseEvent<HTMLElement>) => {
    if (this.props.user.displayName !== this.state.name) {
      this.props.user
        .updateProfile({
          displayName: this.state.name,
          photoURL: null
        })
        .catch(error => this.setState({ errorProfile: error.message }));
    }

    if (this.state.email && this.props.user.email !== this.state.email) {
      this.props.user
        .updateEmail(this.state.email)
        .then(() => this.props.user.sendEmailVerification())
        .catch(error => this.setState({ errorProfile: error.message }));
    }
  };

  private sendUpdatePassword = (event: React.MouseEvent<HTMLElement>) => {
    this.props.user
      .updatePassword(this.state.password)
      .catch(error => this.setState({ errorPassword: error.message }));
  };
}

export default withStyles(dashboardStyles)<IDashboardProps>(Dashboard);
