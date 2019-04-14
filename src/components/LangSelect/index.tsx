import React, { FC } from 'react';
import { FormControl, Select, MenuItem, Theme } from '@material-ui/core';
import de from './flags/de.png';
import es from './flags/es.png';
import fr from './flags/fr.png';
import it from './flags/it.png';
import pt from './flags/pt.png';
import us from './flags/us.png';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing.unit
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}));

const LangSelect: FC = () => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        {/*<InputLabel htmlFor="lang-simple">LANG</InputLabel>*/}
        <Select value={i18n.language} onChange={handleChange}>
          <MenuItem value="fr">
            <img src={fr} />
          </MenuItem>
          <MenuItem value="en">
            <img src={us} />
          </MenuItem>
          <MenuItem value="de">
            <img src={de} />
          </MenuItem>
          <MenuItem value="es">
            <img src={es} />
          </MenuItem>
          <MenuItem value="pt">
            <img src={pt} />
          </MenuItem>
          <MenuItem value="it">
            <img src={it} />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LangSelect;
