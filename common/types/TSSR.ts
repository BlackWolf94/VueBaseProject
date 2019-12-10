/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 02.12.19
 */
import { Store } from 'vuex';

export type TSSRMeta = {
  [key: string]: any;
};

export type TSSRAppConf = {
  router: {
    baseUrl: string;
  };
  i18n: {
    locale: { [key: string]: string };
    currentLang: string;
  };
};

export type TSSRContext = {
  url: string;
  meta?: TSSRMeta;
  title: string;
  appConf: TSSRAppConf;
  appContext: string;
  state?: Store<any>;
};
