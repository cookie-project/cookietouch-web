import React, { FC } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, BrowserRouter } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer';
import Home from './components/Home';
import { makeStyles } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: '#2E2E2E',
      dark: '#eec485',
      light: '#eec485',
      main: '#eec485'
    },
    secondary: {
      contrastText: '#FFF',
      dark: '#EFC991',
      light: '#EFC991',
      main: '#EFC991'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const App: FC = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className={classes.root}>
          <Route path="/" component={Home} exact={true} />
          <Route path="/panel" component={MiniDrawer} exact={true} />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
