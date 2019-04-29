import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { Grid, Link, Typography } from '@material-ui/core';
import { useOvermind } from '../../overmind';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
});

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

  return (
    <div className={classes.root}>
      <Grid container>
        <Typography variant="h3">{t("accountsSell")} ({state.github.accounts.count})</Typography>
        {state.github.accounts.count >= 10 && <Grid item md={6}>
          <Link onClick={refreshAccounts} href="https://commerce.coinbase.com/checkout/68a462d6-04c7-4f06-b317-390ec270e410">10</Link>
        </Grid>}
        {state.github.accounts.count >= 50 && <Grid item md={6}>
          <Link onClick={refreshAccounts} href="https://commerce.coinbase.com/checkout/c24cd51b-1c2d-405d-9218-fca2648c7c9a">50</Link>
        </Grid>}
        {state.github.accounts.count >= 100 && <Grid item md={6}>
          <Link onClick={refreshAccounts} href="https://commerce.coinbase.com/checkout/758baa93-29b8-42f7-833a-43c6881f191f">100</Link>
        </Grid>}
      </Grid>
    </div>
  );
};

export default AccountsSell;
