import LiteEvent from "@/utils/LiteEvent";

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
    this.onChanged.trigger();
  }

  public static get lang() {
    return this.current;
  }

  public static get Changed() {
    return this.onChanged.expose();
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

  private static onChanged = new LiteEvent<void>();

  private static langs: Map<Languages, any> = new Map([
    [Languages.FRENCH, require("./fr.json")],
    [Languages.ENGLISH, require("./en.json")],
    [Languages.DEUTSCH, require("./de.json")],
    [Languages.ITALIAN, require("./it.json")],
    [Languages.PORTUGUESE, require("./pt.json")],
    [Languages.SPANISH, require("./es.json")]
  ]);
}
