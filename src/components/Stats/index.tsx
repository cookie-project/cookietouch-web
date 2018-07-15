import { statsStyles } from "@/components/Stats/styles";
import { IStatsProps, IStatsState, StatsProps } from "@/components/Stats/types";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "firebase";
import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class Stats extends React.Component<StatsProps, IStatsState> {
  public state: IStatsState = {
    totalUsers: 0,
    usersConnected: 0
  };

  public componentDidMount() {
    const listRef = firebase.database().ref("status");
    listRef.on("value", snap => {
      if (!snap) {
        return;
      }
      let num = 0;
      snap.forEach(x => {
        if (x.val().state === "online") {
          num++;
        }
        return false;
      });
      this.setState({
        totalUsers: snap.numChildren(),
        usersConnected: num
      });
    });
  }

  public render() {
    const { classes } = this.props;
    const { totalUsers, usersConnected } = this.state;

    return (
      <div className={classes.root}>
        {usersConnected} / {totalUsers}
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="name"
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default withStyles(statsStyles)<IStatsProps>(Stats);
