import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: "#2E2E2E",
      dark: "#eec485",
      light: "#eec485",
      main: "#eec485"
    },
    secondary: {
      contrastText: "#FFF",
      dark: "#EFC991",
      light: "#EFC991",
      main: "#EFC991"
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
