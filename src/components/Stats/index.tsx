import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useConnectedUsers } from '../../hooks/useConnectedUsers';
import { Typography } from '@material-ui/core';
import { Chart } from 'react-google-charts';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Stats: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [usersConnected, totalUsers] = useConnectedUsers();

  return (
    <div className={classes.root}>
      <Typography>
        {usersConnected} / {totalUsers}
      </Typography>
      <Chart
        width={'600px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          [t('usersConnected'), usersConnected],
          [t('usersDisconnected'), totalUsers - usersConnected]
        ]}
        options={{
          title: `${t('users')} (${totalUsers})`,
          is3D: true
        }}
      />
    </div>
  );
};

export default Stats;
