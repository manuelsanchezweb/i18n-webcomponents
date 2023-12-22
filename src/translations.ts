import { ConfigOptions, LanguageChoice, Translation } from '.';
import { flattenObject } from './utils';
import { convertXML } from 'simple-xml-to-json';

export class I18nService {
  private config: ConfigOptions;
  private currentLang: string;
  private translations: { [key: string]: Translation } = {};

  constructor() {
    this.config = {
      defaultLanguage: 'en',
      languages: ['en', 'es'],
      localesPath: '/src/i18n/locales',
      localesFormat: 'json',
    };
    this.currentLang =
      this.getStoredLanguage() ||
      this.getBrowserLanguage() ||
      this.config.defaultLanguage ||
      'en';
  }

  async loadConfig(config: ConfigOptions) {
    this.config = { ...this.config, ...config };
  }

  async init(config: ConfigOptions) {
    await this.loadConfig(config);
    await this.loadLanguage(this.currentLang);
    await this.attachLanguageSwitchListeners();

    await import('./TranslatableComponent');

    this.translateAttributes();
  }

  async loadLanguage(lang: LanguageChoice): Promise<void> {
    if (!this.translations[lang]) {
      let path;

      try {
        if (this.config.localesFormat === 'xml') {
          path = `${this.config.localesPath}/${lang}.xml`;
          const response = await fetch(path);
          if (!response.ok) {
            console.warn(`Failed to load language file for ${lang}`);
          }
          const xlfText = await response.text();
          const parsedTranslations = await this.parseXml(xlfText);
          console.log('parsedTranslations', parsedTranslations);
          this.translations[lang] = parsedTranslations;
        }
        if (this.config.localesFormat === 'json') {
          path = `${this.config.localesPath}/${lang}.json`;
          const response = await fetch(path);
          if (!response.ok) {
            console.warn(`Failed to load language file for ${lang}`);
          }
          this.translations[lang] = await response.json();
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    }
    this.currentLang = lang;
  }

  translateAttributes() {
    const translatableElements = document.querySelectorAll('[data-i18n]');
    if (!translatableElements) return;
    translatableElements.forEach(element => {
      const attribute = element.getAttribute('data-i18n');
      if (!attribute) return;

      const i18nConfig = JSON.parse(attribute);

      Object.keys(i18nConfig).forEach(attr => {
        const key = i18nConfig[attr];
        if (!key) return;

        element.setAttribute(attr, this.translate(key) as string);
      });
    });
  }

  translate(key: string): string {
    try {
      const flattenJSON = flattenObject(this.translations[this.currentLang]);
      console.log('this is the flattened json', flattenJSON);
      if (!flattenJSON)
        console.log(
          'It is not possible to flatten the JSON Object, there might be some issue with the keys...'
        );
      return flattenJSON[key] || `Missing translation for '${key}'`;
    } catch (error) {
      console.error('Error in translation:', error);
      return key;
    }
  }

  getCurrentLang(): LanguageChoice {
    return this.currentLang;
  }

  private getStoredLanguage(): LanguageChoice | null {
    const langCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('lang='));
    return langCookie ? (langCookie.split('=')[1] as LanguageChoice) : null;
  }

  private getBrowserLanguage(): LanguageChoice {
    const browserLang = navigator.language.slice(0, 2);
    return this.config.languages?.includes(browserLang)
      ? (browserLang as LanguageChoice)
      : 'en';
  }

  async attachLanguageSwitchListeners() {
    document.querySelectorAll('[data-translate]').forEach(element => {
      const lang = element.getAttribute('data-translate') as LanguageChoice;
      element.addEventListener('click', () => this.switchLanguage(lang));
    });
  }

  async switchLanguage(lang: LanguageChoice) {
    await this.loadLanguage(lang);
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    window.dispatchEvent(new CustomEvent('language-changed', { detail: lang }));
    this.translateAttributes();
  }

  private async parseXml(xlfText: any) {
    const parsedXml = convertXML(xlfText);
    console.log(parsedXml);
    // TODO: check here
    let translations = {};

    // Assuming your XLF has a structure like:
    // parsedXml.xliff.file[0].body[0]['trans-unit']
    console.log(
      'this is the parsed xml',
      parsedXml.xliff.children[0].file.children[0].body.children
    );

    parsedXml.xliff.children[0].file.children[0].body.children.forEach(
      (unit: any) => {
        const finalUnit = unit['trans-unit'];

        const key = finalUnit.id;
        const value = finalUnit.children[1].target.content;
        console.log('unit', unit['trans-unit']);
        console.log(key, value);

        translations = { ...translations, [key]: value };
      }
    );

    return flattenObject(translations);
  }
}
