import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useConnectedUsers } from '../../hooks/useConnectedUsers';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Stats: FC = () => {
  const classes = useStyles();
  const [usersConnected, totalUsers] = useConnectedUsers();

  return (
    <div className={classes.root}>
      <Typography>
        {usersConnected} / {totalUsers}
      </Typography>
    </div>
  );
};

export default Stats;
