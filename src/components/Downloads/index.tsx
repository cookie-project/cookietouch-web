import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@material-ui/core';
import { useOvermind } from '../../overmind';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  table: {
    minWidth: 700
  }
});

const Downloads: FC = () => {
  const classes = useStyles();
  const { state } = useOvermind();

  return (
    <div className={classes.root}>
      {state.github.releases.map((r, index) => (
        <div key={index}>
          <h1>{r.name}</h1>
          <h3>{new Date(r.published_at).toLocaleString()}</h3>
          <Typography
            paragraph
            dangerouslySetInnerHTML={{
              __html: r.body.replace(/\r\n/g, '<br />')
            }}
          />
          <h3>Assets</h3>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell align="right" numeric>
                  Téléchargements
                </TableCell>
                <TableCell align="right">Liens</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {r.assets.map(a => (
                <TableRow key={a.id}>
                  <TableCell component="th" scope="row">
                    {a.name}
                  </TableCell>
                  <TableCell align="right" numeric>
                    {a.download_count}
                  </TableCell>
                  <TableCell align="right">
                    <a href={a.browser_download_url}>Lien</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Downloads;
