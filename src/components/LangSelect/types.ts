import { Languages } from "@/utils/langs";
import { LangSelectStyle } from "@components/LangSelect/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";

export interface ILangSelectProps {
  //
}

export interface ILangSelectState {
  lang: Languages;
}

export type LangSelectProps = ILangSelectProps & WithStyles<LangSelectStyle>;
