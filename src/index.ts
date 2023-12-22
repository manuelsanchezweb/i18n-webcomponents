import { I18nService } from './translations';

export type Translation = { [key: string]: string };
export type ConfigOptions = {
  defaultLanguage?: string;
  languages?: string[];
  localesPath?: string;
  localesFormat?: 'json' | 'xml';
};
export type LanguageChoice = string;

export const i18nService = new I18nService();
