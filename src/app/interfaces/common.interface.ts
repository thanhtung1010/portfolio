import { QUERYPARAMS_NAV } from "@app/enums";
import { LANG_TYPE } from "@app/types";

export interface INav {
  label: string;
  queryParams: QUERYPARAMS_NAV;
  show: boolean;
}

export interface ILang {label: string, lang: LANG_TYPE}