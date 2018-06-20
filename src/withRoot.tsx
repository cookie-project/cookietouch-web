import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: "#FFF",
      dark: "#1de099",
      light: "#1de099",
      main: "#1de099"
    },
    secondary: {
      contrastText: "#FFF",
      dark: "#1dc8cd",
      light: "#1dc8cd",
      main: "#1dc8cd"
    }
  }
});

function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
