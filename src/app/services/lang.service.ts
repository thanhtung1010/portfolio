import { Injectable } from "@angular/core";
import { LANG_TYPE } from "../types/lang.type";
import { enviroment } from "@enviroments/enviroment";
import { DEFAULT_LANG, LANG_LIST } from "@app/constants";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { ILang } from "@app/interfaces";
import { CookieStorageHelper } from "@app/helpers";

@Injectable({
  providedIn: "root"
})

export class LangService {
  lang$: BehaviorSubject<LANG_TYPE> = new BehaviorSubject(DEFAULT_LANG);
  langs$: BehaviorSubject<Array<ILang>> = new BehaviorSubject([] as Array<ILang>);
  constructor(private translateSer: TranslateService) {}

  init() {
    this.initLangList();
    this.initLang();
  }

  initLangList() {
    const _langs = LANG_LIST;
    this.langs$.next(_langs);
  }

  initLang() {
    const _lang = CookieStorageHelper.get(enviroment.cookieStorageLangKey);
    this.setLang = _lang;
  }

  get getLang(): LANG_TYPE {
    return this.lang$.value;
  }

  set setLang(lang: LANG_TYPE) {
    const _validate = this.validateLang(lang);
    if (_validate) {
      this.lang$.next(lang);
      CookieStorageHelper.set(enviroment.cookieStorageLangKey, lang);
      this.translateSer.use(lang);
    } else {
      this.lang$.next(DEFAULT_LANG);
      CookieStorageHelper.set(enviroment.cookieStorageLangKey, DEFAULT_LANG);
      this.translateSer.use(DEFAULT_LANG);
    }
  }

  private validateLang(lang: LANG_TYPE): boolean {
    return !!this.langs$.value.find(langObj => langObj.lang === lang);
  }
}