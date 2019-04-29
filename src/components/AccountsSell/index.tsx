import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { Grid, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
});

const AccountsSell: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Grid container>
        <Typography>{t("accountsSell")}</Typography>
        <Grid item>
          <Link href="https://commerce.coinbase.com/checkout/68a462d6-04c7-4f06-b317-390ec270e410">10</Link>
        </Grid>
        <Grid item>
          <Link href="https://commerce.coinbase.com/checkout/c24cd51b-1c2d-405d-9218-fca2648c7c9a">50</Link>
        </Grid>
        <Grid item>
          <Link href="https://commerce.coinbase.com/checkout/758baa93-29b8-42f7-833a-43c6881f191f">100</Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountsSell;
