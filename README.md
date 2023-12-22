<div align="center">
<h1>⭐️ Web Components - i18n ⚽️</h1>
<h2>Opinionated NPM package that allows you to use translatable web components to the languages of your choice.</h2>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<h2><a href='https://web-components-i18n.vercel.app/'>LIVE</a> | <a href='https://github.com/manuelsanchezweb/i18n-webcomponents'>REPO</a> | <a href='https://www.npmjs.com/package/@msweb/i18n-webcomponents'>NPM</a></h2>
</div>

<details>
  <summary>How to use this cool npm package?</summary>
  <ol>
    <li>
      <a href="#basic-use">Basic Use with Config File</a>
    </li>
    <li><a href="#switching-languages">Switching languages</a></li>
    <li>
      <a href="#nesting">Nesting</a>
    </li>
    <li><a href="#interpolation">Interpolation</a></li>
    <li><a href="#localizing-attributes">Localizing attributes</a></li>
	<li><a href="#error-handling">Error handling</a></li>
    <li><a href="#example-of-use">Example of use</a></li>

  </ol>
</details>

## Basic Use

We can localize different languages easily by just creating a basic configuration. Create a file called <code>i18n.config.ts</code> (or .js) and write something like the following:

```
export const config = {
  defaultLanguage: 'en', // primary language until a cookie is set
  languages: ['en', 'es'], // languages that we want to consider in the app
  localesPath: './locales', // folder where we will store the translation files
  localesFormat: 'json', // the format of the translation ('json' and 'xml' are accepted)
};
```

Once you have this, we just import it to the main file.

```main.ts
import { type ConfigOptions, i18nService } from '@msweb/i18n-webcomponents';
import { config } from '../i18n.config';
i18nService.init(config as ConfigOptions)
```
