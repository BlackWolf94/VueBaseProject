/**
 * @author Dmytro Zataidukh
 * @created_at 11/24/19
 */
import { Route } from 'vue-router';
import Vue from 'vue';
import { VueRouter } from 'vue-router/types/router';
import Http from '@web/services/api/Http';
import { defaultLang, isClientRender, langs } from '@web/config/config';

let dialog: any = null;

export async function beforeEach(to: Route, from: Route, next: any): Promise<any> {
  const [root, lang, ...path] = to.path.split('/');
  // @ts-ignore
  const app: Vue = (this as VueRouter).app;
  if (isClientRender) {
    app.$dialog().show();

  }
  // dialog = app.$dialog();

  // dialog.show()

  if (app.$currentLang === lang) {
    next();
    return;
  }

  if (!langs.includes(lang)) {
    next([root, defaultLang, ...path].join('/'));
    return;
  }

  app.$addLocale(lang, await Http.get(`locale/${lang}`));
  app.$currentLang = lang;
  next();
}


export async function afterEach(to: Route, from: Route) {
  if (isClientRender) {
  }


}
