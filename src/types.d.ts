export type Translation = { [key: string]: string }
export type ConfigOptions = {
  defaultLanguage?: string
  languages?: string[]
  localesPath?: string
  localesFormat?: 'json' | 'xml'
}
export type LanguageChoice = string
