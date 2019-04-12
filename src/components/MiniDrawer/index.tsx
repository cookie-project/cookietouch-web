import React from 'react';
import classNames from 'classnames';
import { makeStyles, useTheme } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import { Theme } from '@material-ui/core';
import { useOvermind } from '../../overmind';
import Stats from '../Stats';
import Dashboard from '../Dashboard';
import Downloads from '../Downloads';
import Lang from '../../utils/lang';
import { Redirect } from 'react-router-dom';
import LangSelect from '../LangSelect';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    }),
    zIndex: theme.zIndex.drawer + 1
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    }),
    width: `calc(100% - ${drawerWidth}px)`
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  currentTab: {
    background: 'rgba(0, 0, 0, .1)'
  },
  drawerPaper: {
    position: 'relative',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    }),
    whiteSpace: 'nowrap',
    width: drawerWidth
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  hide: {
    display: 'none'
  },
  langSelect: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
}));

function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const { state, effects } = useOvermind();

  const changePage = (page: number) => () => {
    setPage(page);
  };

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div>
      {!state.firebase.user ? (
        <Redirect to="/" />
      ) : (
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap={true}>
                CookieTouch
              </Typography>
              <div className={classes.langSelect}>
                <LangSelect />
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              )
            }}
            open={open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme && theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                className={classNames(page === 0 && classes.currentTab)}
                button={true}
                onClick={changePage(0)}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={Lang.go('home')} />
              </ListItem>
              <ListItem
                className={classNames(page === 1 && classes.currentTab)}
                button={true}
                onClick={changePage(1)}
              >
                <ListItemIcon>
                  <DownloadIcon />
                </ListItemIcon>
                <ListItemText primary={Lang.go('downloads')} />
              </ListItem>
              <ListItem
                className={classNames(page === 2 && classes.currentTab)}
                button={true}
                onClick={changePage(2)}
              >
                <ListItemIcon>
                  <BubbleChartIcon />
                </ListItemIcon>
                <ListItemText primary={Lang.go('stats')} />
              </ListItem>
              <ListItem button={true} onClick={effects.firebase.signout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={Lang.go('signout')} />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {state.firebase.user.emailVerified ? (
              <div>
                {page === 0 && <Dashboard />}
                {page === 1 && <Downloads />}
                {page === 2 && <Stats />}
              </div>
            ) : (
              <Dashboard />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default MiniDrawer;
