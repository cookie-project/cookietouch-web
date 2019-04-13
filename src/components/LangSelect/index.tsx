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

const langsImages: Record<string, string> = {
  fr: fr,
  de: de,
  it: it,
  pt: pt,
  en: us,
  es: es
};

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
    i18n.changeLanguage(lang);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        {/*<InputLabel htmlFor="lang-simple">LANG</InputLabel>*/}
        <Select
          value={i18n.language}
          onChange={handleChange}
          inputProps={{
            id: 'lang-simple',
            name: 'lang'
          }}
        >
          {i18n.languages.map(l => (
            <MenuItem key={l} value={l}>
              <img src={langsImages[l]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default LangSelect;
