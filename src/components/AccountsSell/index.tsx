import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Card, CardContent, CardActions, Button, Theme, Paper } from '@material-ui/core';
import { useOvermind } from '../../overmind';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
}));

const AccountsSell: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { state, actions } = useOvermind();

  useEffect(() => {
    refreshAccounts()
  }, []);

  const refreshAccounts = () => {
    actions.github.getAccounts()
  }

  /*
  {state.github.accounts.count >= 10 && <Grid item md={4}>
          <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {t('account', { count: 10 })} 3€
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="https://commerce.coinbase.com/checkout/68a462d6-04c7-4f06-b317-390ec270e410" size="small">{t('buy')}</Button>
          </CardActions>
        </Card>
        </Grid>}
        {state.github.accounts.count >= 50 && <Grid item md={4}>
          <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {t('account', { count: 50 })} 13.50€
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="https://commerce.coinbase.com/checkout/c24cd51b-1c2d-405d-9218-fca2648c7c9a" size="small">{t('buy')}</Button>
          </CardActions>
        </Card>
        </Grid>}
        {state.github.accounts.count >= 100 && <Grid item md={4}>
          <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {t('account', { count: 100 })} 25€
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="https://commerce.coinbase.com/checkout/758baa93-29b8-42f7-833a-43c6881f191f" size="small">{t('buy')}</Button>
          </CardActions>
        </Card>
        </Grid>}
   */

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={1}>
        <Typography variant="h5" component="h5">
        {t("accountsSellDetails", { count: state.github.accounts.count })}
        </Typography>
      </Paper>
      <br/><br/>
      <Grid container spacing={32} justify="space-around">
        <Grid item>
          <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {t('account', { count: 10 })} 3€
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="https://commerce.coinbase.com/checkout/68a462d6-04c7-4f06-b317-390ec270e410" size="small">{t('buy')}</Button>
          </CardActions>
        </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {t('account', { count: 50 })} 13.50€
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="https://commerce.coinbase.com/checkout/c24cd51b-1c2d-405d-9218-fca2648c7c9a" size="small">{t('buy')}</Button>
          </CardActions>
        </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {t('account', { count: 100 })} 25€
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="https://commerce.coinbase.com/checkout/758baa93-29b8-42f7-833a-43c6881f191f" size="small">{t('buy')}</Button>
          </CardActions>
        </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountsSell;
