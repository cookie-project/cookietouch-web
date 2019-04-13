import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useOvermind } from '../../overmind';
import { Paper, Typography, Button, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Dashboard: FC = () => {
  const classes = useStyles();
  const { state } = useOvermind();
  const { t } = useTranslation();
  const [email, setEmail] = useState(
    (state.firebase.user && state.firebase.user.email) || ''
  );
  const [name, setName] = useState(
    (state.firebase.user && state.firebase.user.displayName) || ''
  );
  const [errorPassword, setErrorPassword] = useState('');
  const [errorProfile, setErrorProfile] = useState('');
  const [password, setPassword] = useState('');

  const sendActivationEmail = (user: firebase.User | null) => () => {
    if (user) {
      user.sendEmailVerification();
    }
  };

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const updateProfile = () => {
    if (!state.firebase.user) {
      return;
    }

    if (state.firebase.user.displayName !== name) {
      state.firebase.user
        .updateProfile({
          displayName: name,
          photoURL: null
        })
        .catch(error => setErrorProfile(error.message));
    }

    if (state.firebase.user.email !== email) {
      state.firebase.user
        .updateEmail(email)
        .then(() => {
          if (state.firebase.user) {
            state.firebase.user.sendEmailVerification();
          }
        })
        .catch(error => setErrorProfile(error.message));
    }
  };

  const sendUpdatePassword = () => {
    if (!state.firebase.user) {
      return;
    }
    state.firebase.user
      .updatePassword(password)
      .catch(error => setErrorPassword(error.message));
  };

  return (
    <div className={classes.root}>
      {state.firebase.user && !state.firebase.user.emailVerified && (
        <Paper
          style={{
            background: 'rgba(255, 0, 0, .3)',
            marginBottom: 30,
            padding: 20
          }}
        >
          <Typography variant="headline">{t('activateTitle', name)}</Typography>
          <Typography variant="body1">{t('activateMessage')}</Typography>
          <Button
            style={{ marginTop: 20 }}
            variant="contained"
            color="primary"
            onClick={sendActivationEmail(state.firebase.user)}
          >
            {t('sendActivationEmail')}
          </Button>
        </Paper>
      )}
      <Grid container={true} spacing={8}>
        <Grid item={true} md={6}>
          <Grid container={true} spacing={8}>
            <Grid item={true} md={6} xs={12}>
              <Paper style={{ margin: 10, padding: 10 }}>
                <TextField
                  autoFocus={true}
                  margin="dense"
                  id="name"
                  name="name"
                  label={t('name')}
                  value={name ? name : ''}
                  fullWidth={true}
                  onChange={updateName}
                  type="text"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  autoFocus={true}
                  margin="dense"
                  id="email"
                  name="email"
                  label={t('email')}
                  value={email ? email : ''}
                  fullWidth={true}
                  onChange={updateEmail}
                  type="email"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  style={{ marginTop: 20 }}
                  color="primary"
                  variant="contained"
                  onClick={updateProfile}
                >
                  {t('update')}
                </Button>
                {errorProfile !== '' && (
                  <Typography variant="body1" style={{ color: 'red' }}>
                    {errorProfile}
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
                  label={t('password')}
                  value={password ? password : ''}
                  fullWidth={true}
                  onChange={updatePassword}
                  type="password"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  style={{ marginTop: 20 }}
                  color="primary"
                  variant="contained"
                  onClick={sendUpdatePassword}
                >
                  {t('update')}
                </Button>
                {errorPassword !== '' && (
                  <Typography variant="body1" style={{ color: 'red' }}>
                    {errorPassword}
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} md={6} xs={12}>
          <a href="https://docs.cookietouch.com">Documentation</a>
          <br />
          <a href="https://discord.gg/R7HsTnD">Join our discord</a>
          <iframe
            src="https://discordapp.com/widget?id=463708615488962562&theme=dark"
            width="100%"
            height="600px"
            // allowTransparency={true}
            frameBorder="0"
          />
        </Grid>
        <Grid item md={12}>
          <div>
            <a
              className="donate-with-crypto"
              href="https://commerce.coinbase.com/checkout/ecfce59a-cf8e-426d-a1cf-50e5e7170e8b"
            >
              <span>Donate with Crypto</span>
            </a>
            <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
