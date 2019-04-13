import React, { FC, ChangeEvent, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Grid,
  Link
} from '@material-ui/core';
import { useOvermind } from '../../overmind';
import { useTranslation } from 'react-i18next';

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
  const [release, setRelease] = useState(state.github.releases[0]);
  const { t, i18n } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRelease = state.github.releases.find(
      r => r.id.toString() === event.target.value
    );
    if (newRelease) {
      setRelease(newRelease);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={6}>
          <Select value={release.id} onChange={handleChange}>
            {state.github.releases.map(r => (
              <MenuItem key={r.id} value={r.id}>
                {r.name}
              </MenuItem>
            ))}
          </Select>
          <br />
          <br />
          <hr />
          <br />
          <Typography variant="h4">{release.name}</Typography>
          <Typography variant="h6">
            {new Date(release.published_at).toLocaleString()}
          </Typography>
          <Typography
            paragraph
            dangerouslySetInnerHTML={{
              __html: release.body.replace(/\r\n/g, '<br />')
            }}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6">Assets</Typography>
          <Table className={classes.table} padding="dense">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell align="right">Téléchargements</TableCell>
                <TableCell align="right">Liens</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {release.assets.map(a => (
                <TableRow key={a.id}>
                  <TableCell component="th" scope="row">
                    {a.name}
                  </TableCell>
                  <TableCell align="right">{a.download_count}</TableCell>
                  <TableCell align="right">
                    <Link variant="button" href={a.browser_download_url}>
                      Lien
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
  );
};

export default Downloads;
