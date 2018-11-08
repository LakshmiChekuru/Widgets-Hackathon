import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `demo-widget`
 * Getting to know polymer
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class QnA extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[checkValue]] [[prop1]]!</h2>
      <input type="text"></input>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'qna-widget',
      },
      checkValue:{
        type: String,
        value: 'check',
      }
    };
  }
}

window.customElements.define('qna-widget', QnA);
