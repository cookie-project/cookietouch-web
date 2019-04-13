import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useConnectedUsers } from '../../hooks/useConnectedUsers';
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
      <Chart
        width={'600px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Users', '#'],
          [t('usersConnected'), usersConnected],
          [t('usersDisconnected'), totalUsers - usersConnected]
        ]}
        options={{
          title: `${t('users')} (${totalUsers})`,
          is3D: true,
          backgroundColor: '#666'
        }}
      />
    </div>
  );
};

export default Stats;
