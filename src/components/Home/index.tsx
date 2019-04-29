import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Theme,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  CardActions,
  Button
} from '@material-ui/core';
import { Redirect } from 'react-router';
import LangSelect from '../LangSelect';
import { useOvermind } from '../../overmind';
import icon from './icon.png';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useTranslation } from 'react-i18next';

const logoSize = 150;

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    background: 'rgba(0, 0, 0, .5)',
    color: 'white',
    margin: 15,
    marginTop: logoSize,
    minWidth: 280,
    padding: 5
  },
  formControl: { margin: theme.spacing.unit },
  Langelect: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  logo: {
    left: '50%',
    marginLeft: -(logoSize / 2),
    position: 'absolute',
    width: logoSize
  },
  root: {
    background:
      'lightgrey url(https://proxyconnection.touch.dofus.com/assets/ui/login/login_bg.jpg) no-repeat fixed center',
    flexGrow: 1,
    height: '100%'
  },
  title: {
    fontSize: 22,
    marginBottom: 16
  }
}));

const Home: FC = () => {
  const classes = useStyles();
  const { state, effects } = useOvermind();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleClickShowPasssword = () => {
    setShowPassword(!showPassword);
  };

  const signin = async () => {
    try {
      setEmail('');
      setPassword('');
      await effects.firebase.signin(email, password);
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email': {
          setError(t('invalidEmail'));
          return;
        }
        case 'auth/wrong-password': {
          setError(t('wrongPassword'));
          return;
        }
        default:
          break;
      }
      // ECHEC CONNECTION
      try {
        await effects.firebase.signup(email, password);
      } catch (errorSignup) {
        // ECHEC SIGNUP
        // eslint-disable-next-line no-console
        console.log(error.message);
      }
    }
  };

  return (
    <div className={classes.root}>
      {state.firebase.user ? (
        <Redirect to="/panel" />
      ) : (
        <Grid container={true} spacing={0} justify="center">
          <div className={classes.Langelect}>
            <LangSelect />
          </div>
          <Grid item={true} xs={'auto'} md={3}>
            <img alt="logo" className={classes.logo} src={icon} />
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="inherit"
                  style={{ textAlign: 'center' }}
                >
                  CookieTouch
                </Typography>
                <FormControl fullWidth={true} className={classes.formControl}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    autoFocus={true}
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth={true}
                  />
                </FormControl>
                <FormControl fullWidth={true} className={classes.formControl}>
                  <InputLabel htmlFor="password">{t('password')}</InputLabel>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPasssword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {error !== '' && (
                  <Typography
                    variant="body1"
                    style={{ color: 'red', marginTop: 20 }}
                  >
                    {error}
                  </Typography>
                )}
                <Typography
                  color="inherit"
                  variant="caption"
                  style={{ marginTop: 20 }}
                >
                  {t('signinInfos')}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container={true} spacing={0} justify="space-around">
                  <Button size="small" variant="contained" onClick={signin}>
                    {t('signin')}
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Home;
