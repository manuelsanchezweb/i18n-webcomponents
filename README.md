<div align="center">
<h1>⭐️ Web Components - i18n</h1>
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
    <li><a href="#examples-of-use">Examples of use</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

## Basic Use

We can localize different languages easily by just creating a basic configuration. Create a file called <code>i18n.config.ts</code> (or .js) and write something like the following:

```ts
export const config = {
  defaultLanguage: 'en', // primary language until a cookie is set and if browser language is not available
  languages: ['en', 'es'], // languages that we want to consider in the app
  localesPath: './locales', // folder where we will store the translation files
  localesFormat: 'json', // the format of the translation ('json' and 'xml' are accepted)
};
```

Once you have this, we just import it to the main file.

```ts
import { type ConfigOptions, i18nService } from '@msweb/i18n-webcomponents';
import { config } from '../i18n.config';

i18nService.init(config as ConfigOptions)
```

> [!IMPORTANT]  
> Files should be called <code>[lang].json</code> or <code>[lang].xml</code>. Since there are maybe some specifities specially for the <code>xml structure</code>, I would recommend to take a look to the [locales examples](https://github.com/manuelsanchezweb/i18n-webcomponents/tree/main/locales) in the repo.

Now, if we have for example <code>en.json</code> and <code>es.json</code> with the same <code>key</code>, let us say, <code>greeting</code>, we could do the following in our markup:

```html
<f-translate key="greeting"></f-translate>
```

## Switching Languages

As we said, the default language is cool, but we need a way of switching the language. We can do it through two different ways:

- Either we add the functionality to any element using <code>data-translate="[lang]"</code>
- Or we call the method <code>i18nService.switchLanguage('[lang]')</code> passing the locale we need.

```html
<button data-translate="en">English</button>
<button data-translate="es">Spanish</button>
```

## Nesting

This is specific for the ones using <code>json</code> format. It is possible to create nested structures with your json. The package will flatten the object and make the key coincide with what you have nested. But please, take in mind that everything will be transformed into <code>kevab case></code>.

```json
en.json
{
  "greeting": "Hello",
  "farewell": "Goodbye",
  "custom-greeting": "Hello, {name}",
  "coins": "You have {number} coins, {name}",
  "days": {
    "monday": "Monday",
    "lovely": {
      "tuesday": "Tuesday"
    }
  }
}
```

```html
<f-translate key="days-monday"></f-translate>
<f-translate key="days-lovely-tuesday"></f-translate>
```

## Interpolation

We will sometimes need to pass variables inside our translation files. That is pretty common, check for example in the above json example the <code>custom-greeting</code> or the <code>coins</code>. This can be done also if we are using <code>xml</code>.

```xml
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="file">
    <body>
      <trans-unit id="greeting">
        <source>Hello</source>
        <target>Hello</target>
      </trans-unit>
      <trans-unit id="farewell">
        <source>Goodbye</source>
        <target>Goodbye</target>
      </trans-unit>
      <trans-unit id="custom-greeting">
        <source>Hello, {name}</source>
        <target>Hello, {name}</target>
      </trans-unit>
      <trans-unit id="coins">
        <source>You have {number} coins, {name}</source>
        <target>You have {number} coins, {name}</target>
      </trans-unit>
      <trans-unit id="days-monday">
        <source>Monday</source>
        <target>Monday</target>
      </trans-unit>
      <trans-unit id="days-lovely-tuesday">
        <source>Tuesday</source>
        <target>Tuesday</target>
      </trans-unit>
      <!-- ... additional trans-unit elements for other keys ... -->
    </body>
  </file>
</xliff>
```

## Localizing Attributes

For accessibility and good practices reasons, we can also localize different attributes like <code>aria-label</code> or <code>title</code>. The way it is a bit different, we are passing props inside the attribute <code>data-i18n</code>.

```html
<button data-i18n='{"aria-label": "days-monday"}'>Check day of the week</button>
```

And of course we can combine different tools from the package here. The following example makes no much sense, but I am pretty sure you can come up with something more useful than this:

```html
<button
  class="cool-btn"
  data-translate="en"
  data-i18n='{"aria-label": "days-monday", "title": "days-lovely-tuesday"}'
>
  <f-translate key="greeting"></f-translate>
</button>
```

## Error handling

I have tried to equip the npm with a good number of <code>try/catch</code>, with some cool <code>ts types</code>, but of course, I can imagine there will be some errors/bugs in the dev experience. Please, let me know so that I can update this part with some of the common issues.

## Examples of use

I recommend to take a look to the following links for further and quicker development:

- [locales examples](https://github.com/manuelsanchezweb/i18n-webcomponents/tree/main/locales)
- [example of a page with the web component]()
- [config example](https://github.com/manuelsanchezweb/i18n-webcomponents/blob/main/i18n.config.ts)
