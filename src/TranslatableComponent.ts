import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { i18nService } from '.';

@customElement('f-translate')
export class FTranslate extends LitElement {
  @property({ type: String }) key = '';
  @property({ type: Object }) params = {};

  constructor() {
    super();
    this.attachEventListener();
  }

  attachEventListener() {
    window.addEventListener('language-changed', () => {
      this.requestUpdate(); // Trigger re-render
    });
  }

  disconnectedCallback() {
    window.removeEventListener('language-changed', () => {
      console.log('deactivated');
    });
  }

  render() {
    let translation = i18nService.translate(this.key);
    const params = this.getAttribute('params');

    // ⭐️ Handle interpolation
    if (params) {
      const paramObj = JSON.parse(params);
      Object.keys(paramObj).forEach(paramKey => {
        if (!translation) return;
        translation = translation.replace(`{${paramKey}}`, paramObj[paramKey]);
      });
    }

    return html`${translation}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'f-translate': FTranslate;
  }
}
