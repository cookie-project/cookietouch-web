import * as firebase from "firebase";
import * as React from "react";

interface IAuthState {
  user: firebase.User | null;
}

const defaultValue: IAuthState = { user: null };
const AuthContext = React.createContext(defaultValue);

export const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends React.Component<{}, IAuthState> {

  public state: IAuthState = {
    user: null
  };

  public componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  public render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthProvider;
