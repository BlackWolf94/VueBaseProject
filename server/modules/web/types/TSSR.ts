/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 02.12.19
 */

export type TSSRMeta = {
  [key: string]: any;
};

export type TSSRContext = {
  baseUrl: string;
  url: string;
  locale: { [key: string]: string };
  currentLang: string;
  meta?: TSSRMeta;
  user?: { [key: string]: any };
  title: string
}
