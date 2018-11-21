import { PolymerElement, html } from '@polymer/polymer';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';


/*

`widget-error` is an element used to show widget errors

Example:
<widget-error message="this is A TEST message"></widget-error>
Also we can optionally Use the following variables to modify error styles. It Can be dne by styling widget-header tag or any custom class in your css.
	--error-background-color: #F2DEDE (default)-> for error box background color;
	--error-border-color: #F5C6CB (default) -> for error box border-color.
	--error-text-color: #A94442 (default); ->for error text color.

*/

'use strict';
/**
 * `widget-error`
 * Widget to show error message in a web component
 *
 * @customElement
 * @polymer
 * @demo index.html
 */

class WidgetError extends GestureEventListeners(PolymerElement) {

  static get is() {
    return 'widget-error';
  }

  static get template() {
    return html`<style>
			:host {
				display: block;
				--error-background-color: #F2DEDE;
				--error-border-color: #F5C6CB;
				--error-text-color: #A94442;

			}

			* {
				box-sizing: border-box;
				margin: 0;
			}

			.widget-error-wrap {
				position: absolute;
				bottom: 0;
				margin: 0 auto;
				padding: 5px;
				width: 100%;
				height: auto;
				cursor: default;
				background-color: var(--error-background-color);
				color: var(--error-text-color);
				border: solid 1px var(--error-border-color);
				text-align: center;
				overflow: hidden;

				display: block;
			}

			.hide-error {
				-webkit-animation: seconds 1.0s forwards;
				animation: seconds 1.0s forwards;
				-webkit-animation-iteration-count: 1;
				animation-iteration-count: 1;
				-webkit-animation-delay: 10s;
				animation-delay: 10s;
			}

			@-webkit-keyframes seconds {
				0% {
					opacity: 1;
				}
				100% {
					opacity: 0;
					left: -9999px;
				}
			}

			@keyframes seconds {
				0% {
					opacity: 1;
				}
				100% {
					opacity: 0;
					left: -9999px;
				}
			}

			.widget-error-wrap .close {
				position: absolute;
				right: 5px;
				top: 0;
				font-weight: bolder;
				font-size: 18px;
				color: rgb(56, 6, 6);
				cursor: pointer;
				opacity: 0.3;
			}

		</style>

		<template is="dom-if" if="{{_hasMessage(message)}}">
			<div class="widget-error-wrap hide-error">
				<div class="close" on-tap="detached">x</div>
				[[message]]
			</div>
		</template>`;
  }

  static get properties() {
    return {
      message: {
        type: String,
        value: 'Oops! Something went wrong...',
        notify: true,
        observer: '_messageChanged'
      },

      _messageThread: {
        type: Number,
        value: 0
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _messageChanged(newValue) {
    if (newValue) {
      clearTimeout(this._messageThread);
      this._messageThread = setTimeout(() => {
        this.message = '';
      }, 1000 * 10);
    }
  }

  _hasMessage(message) {
    return typeof message === 'string' && message.length > 0;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.detached();
  }

  detached(e) {
    if (typeof e !== 'undefined') {
      e.preventDefault();
    }
    this.message = '';
    clearTimeout(this._messageThread);
  }
}

window.customElements.define(WidgetError.is, WidgetError);

