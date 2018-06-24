import { langSelectStyles } from "@/components/LangSelect/styles";
import {
  ILangSelectProps,
  ILangSelectState,
  LangSelectProps
} from "@/components/LangSelect/types";
import Langs, { Languages } from "@/utils/langs";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";

class LangSelect extends React.Component<LangSelectProps, ILangSelectState> {
  public state: ILangSelectState = {
    lang: Languages.FRENCH
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="lang-simple">LANG</InputLabel>
          <Select
            value={this.state.lang}
            onChange={this.handleChange}
            inputProps={{
              id: "lang-simple",
              name: "lang"
            }}
          >
            <MenuItem value={Languages.FRENCH}>FR</MenuItem>
            <MenuItem value={Languages.ENGLISH}>EN</MenuItem>
            <MenuItem value={Languages.SPANISH}>ES</MenuItem>
            <MenuItem value={Languages.DEUTSCH}>DE</MenuItem>
            <MenuItem value={Languages.PORTUGUESE}>PT</MenuItem>
            <MenuItem value={Languages.ITALIAN}>IT</MenuItem>
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
