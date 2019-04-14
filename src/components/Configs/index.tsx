import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useOvermind } from '../../overmind';
import { useTranslation } from 'react-i18next';
import { useGlobalConfig } from '../../hooks/useGlobalConfig';
import {
  Card,
  Typography,
  TextField,
  Theme,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
}));

const Configs: FC = () => {
  const classes = useStyles();
  const { state } = useOvermind();
  const { t } = useTranslation();
  const config = useGlobalConfig(
    state.firebase.user ? state.firebase.user.uid : ''
  );

  return (
    <div className={classes.root}>
      <Card style={{ backgroundColor: '#d32f2f', padding: 10, margin: 10 }}>
        <Typography variant="h5">{t('soonAvalaible')}</Typography>
      </Card>
      {config && (
        <div>
          <TextField
            disabled
            label="Pushbullet token"
            defaultValue={config.pushBulletAccessToken}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            disabled
            label="Anticaptcha Key"
            defaultValue={config.anticaptchaKey}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <br />
          <Typography>Accounts</Typography>
          <List dense>
            {config.accounts.map(a => (
              <ListItem key={a.username}>
                <ListItemText>{a.username}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default Configs;
