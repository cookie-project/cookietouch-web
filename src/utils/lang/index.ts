import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import it from './it.json';
import pt from './pt.json';
import LiteEvent from '../LiteEvent';

export enum Languages {
  FRENCH = 'fr',
  ENGLISH = 'en',
  DEUTSCH = 'de',
  SPANISH = 'es',
  ITALIAN = 'it',
  PORTUGUESE = 'pt'
}

export default class Lang {
  private static current = Languages.FRENCH;

  private static onChanged = new LiteEvent<void>();

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
  private static langs: Map<Languages, any> = new Map([
    [Languages.FRENCH, fr],
    [Languages.ENGLISH, en],
    [Languages.DEUTSCH, de],
    [Languages.ITALIAN, it],
    [Languages.PORTUGUESE, pt],
    [Languages.SPANISH, es]
  ]);

  public static go(key: string, ...params: any[]): string {
    const path = key.split('.');
    const lang = this.langs.get(this.current);
    const elang = this.langs.get(Languages.ENGLISH);

    let value: Record<string, string> | undefined;
    let evalue: Record<string, string> | undefined;

    for (const p of path) {
      value = value ? value[p] : lang[p];
      evalue = evalue ? evalue[p] : elang[p];
      if (!value) {
        value = evalue;
      }
    }

    let str = (value as unknown) as string;

    if (params.length === 0) {
      return str;
    } else {
      for (const param of params) {
        str = str.replace('?', param && param.toString());
      }
      return str;
    }
  }
}
