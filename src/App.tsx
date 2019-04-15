import React, { FC, Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { Route, BrowserRouter } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer';
import Home from './components/Home';
import { makeStyles } from '@material-ui/styles';
import { amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback="Loading...">
          <div className={classes.root}>
            <Route path="/" component={Home} exact={true} />
            <Route path="/panel" component={MiniDrawer} exact={true} />
          </div>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
