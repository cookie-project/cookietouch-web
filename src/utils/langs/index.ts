// tslint:disable-next-line
import fr from "./fr.json";

export enum Languages {
  FRENCH = "fr",
  ENGLISH = "en",
  DEUTSCH = "de",
  SPANISH = "es",
  ITALIAN = "it",
  PORTUGUESE = "pt"
}

export default class Langs {
  public static set lang(lang: Languages) {
    this.current = lang;
  }

  public static go(key: string, ...params: any[]): string {
    let value = this.langs.get(this.current)[key] as string;
    if (!value) {
      value = this.langs.get(Languages.ENGLISH)[key] as string;
      if (!value) {
        return "<empty>";
      }
    }
    if (params.length === 0) {
      return value;
    } else {
      for (const param of params) {
        value = value.replace("?", param);
      }
      return value;
    }
  }

  private static current = Languages.FRENCH;
  private static langs: Map<Languages, any> = new Map([
    [Languages.FRENCH, fr],
    [Languages.ENGLISH, fr],
    [Languages.DEUTSCH, fr],
    [Languages.ITALIAN, fr],
    [Languages.PORTUGUESE, fr],
    [Languages.SPANISH, fr]
  ]);
}
