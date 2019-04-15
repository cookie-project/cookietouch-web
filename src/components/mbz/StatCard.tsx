import Card from '@material-ui/core/Card';
import styled from '@material-ui/styles/styled';
import makeStyles from '@material-ui/styles/makeStyles';
import React, { FC } from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { Typography, Theme } from '@material-ui/core';

const CustomCard = styled(Card)({
  background: 'white',
  border: 0,
  borderRadius: 15,
  color: 'black',
  padding: 20
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.light
  }
}));

interface StatCardProps {
  title: string;
  percent: number | string;
  desc: string;
}

const StatCard: FC<StatCardProps> = ({ title, percent, desc }) => {
  const classes = useStyles();

  return (
    <CustomCard className={classes.root}>
      <CardHeader title={title} />
      <Typography variant="h3">{percent}%</Typography>
      <CardContent>{desc}</CardContent>
    </CustomCard>
  );
};

export default StatCard;
