import Langs, { Languages } from "@/utils/langs";
import firebase from "firebase";
import * as React from "react";

interface IMainState {
  user: firebase.User | null;
  lang: Languages;
}

const defaultValue: IMainState = { user: null, lang: Languages.ENGLISH };
const MainContext = React.createContext(defaultValue);

export const MainConsumer = MainContext.Consumer;

class MainProvider extends React.Component<{}, IMainState> {
  public state: IMainState = {
    lang: Languages.ENGLISH,
    user: null
  };

  public remove: firebase.Unsubscribe;

  public componentDidMount() {
    Langs.Changed.on(this.onLangChanged);
    this.remove = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  public componentWillUnmount() {
    Langs.Changed.off(this.onLangChanged);
    this.remove();
  }

  public render() {
    return (
      <MainContext.Provider value={this.state}>
        {this.props.children}
      </MainContext.Provider>
    );
  }

  private onLangChanged = () => {
    this.setState({ lang: Langs.lang });
  };
}

export default MainProvider;
