import de from "@/components/LangSelect/flags/de.png";
import es from "@/components/LangSelect/flags/es.png";
import fr from "@/components/LangSelect/flags/fr.png";
import it from "@/components/LangSelect/flags/it.png";
import pt from "@/components/LangSelect/flags/pt.png";
import us from "@/components/LangSelect/flags/us.png";
import { langSelectStyles } from "@/components/LangSelect/styles";
import {
  ILangSelectProps,
  ILangSelectState,
  LangSelectProps
} from "@/components/LangSelect/types";
import Langs, { Languages } from "@/utils/langs";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";

class LangSelect extends React.Component<LangSelectProps, ILangSelectState> {
  public state: ILangSelectState = {
    lang: Langs.lang
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          {/*<InputLabel htmlFor="lang-simple">LANG</InputLabel>*/}
          <Select
            value={this.state.lang}
            onChange={this.handleChange}
            inputProps={{
              id: "lang-simple",
              name: "lang"
            }}
          >
            <MenuItem value={Languages.FRENCH}>
              <img src={fr} />
            </MenuItem>
            <MenuItem value={Languages.ENGLISH}>
              <img src={us} />
            </MenuItem>
            <MenuItem value={Languages.SPANISH}>
              <img src={es} />
            </MenuItem>
            <MenuItem value={Languages.DEUTSCH}>
              <img src={de} />
            </MenuItem>
            <MenuItem value={Languages.PORTUGUESE}>
              <img src={pt} />
            </MenuItem>
            <MenuItem value={Languages.ITALIAN}>
              <img src={it} />
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value as Languages;
    this.setState({ lang }, () => {
      Langs.lang = lang;
    });
  };
}

export default withStyles(langSelectStyles)<ILangSelectProps>(LangSelect);
