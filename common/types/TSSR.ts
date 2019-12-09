/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 02.12.19
 */
import { Store } from 'vuex';

export type TSSRMeta = {
  [key: string]: any;
};

export type TSSRContext = {
  meta?: TSSRMeta;
  title: string;
  state: {
    initialState?: Store<any>;
    app?: {
      baseUrl: string;
      url: string;
      locale: { [key: string]: string };
      currentLang: string;
      user?: { [key: string]: any };
    };
  };
};
