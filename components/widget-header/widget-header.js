import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';

/*

	*
	* Use the following variables to modify header styles
	* Can be dne by styling widget-header tag or any custom class in your css
	* --header-background-color: #000 (default) {{For Header Background Color}};
  *	--header-font-color: #fff (default) {{For Header Text Color}};
  *	--header-font-weight: bold (default) {{For Header Text Font Weight}};
	*	--header-alignment: center/flex-start/flex-end (center default){{Header alignment left/center/right}};
	* Use position-before-title slot/class for logo background or font awesome. Give additional required styles by adding custom classes in your styles.

    //Demo css class for background logo image
		.className {
				width: 40px;
				height: 40px;
				background-repeat: no-repeat;
				background-size: 30px;
				background-position: 6px;
				background: url('https://lh3.googleusercontent.com/wTyhjIPMXRssKkgpVLJa4a88s9S4w8Fw9jqnMCjI6Cp8m-VF5PPadeSr8ubdOWnCS2o=w300');*!/
			}
		//Demo css class for background logo fontawesome
		.className {
				font-size: 20px;
				color: #fff;
				margin-right:5px;
			}

	Optionally you can insert html content in the widget there are different slots in header
	Example:
	<widget-header><h1>hi</h1></widget-header>

	<widget-header>
		<i class="position-left fa fa-arrow-left"></i>
		<i class="position-center fa fa-arrow-left"></i>
		<i class="position-before-title fa fa-arrow-left"></i>
		<a href="#" class="position-right fa fa-edit"></a>
	</widget-header>

	* position-left
 	* position-center
 	* position-right
 	* position-before-title
 	* position-after-title
 	These classes are required to place the elements in their respective slots for showing icons/button in header.

*/

'use strict';
/**
 * `widget-header`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class WidgetHeader extends GestureEventListeners(PolymerElement) {
  /* this is the element's prototype */
  static get is() {
    return 'widget-header'
  }

  static get template() {
    return html`
          <style>
             :host {
            display: block;
            font-family: sans-serif;
            position: relative;
            --header-background-color: #000;
            --header-font-color: #fff;
            --header-alignment: center;
            --header-font-weight: bold;
            --header-title: {
            }
          }
    
          * {
            box-sizing: border-box;
            margin: 0;
          }
    
          .overflow-container {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
    
          .widget-header-wrap {
            height: 40px;
            background-color: var(--header-background-color);
            overflow: hidden;
          }
    
          .widget-header-data {
            display: flex;
          }
    
          .widget-header-title {
            height: 40px;
            line-height: 40px;
            font-weight: var(--header-font-weight);
            white-space: nowrap;
            max-width: 100%;
            color: var(--header-font-color);
            display: flex;
            align-items: center;
            align-self: center;
            justify-content: var(--header-alignment);
            flex: 1;
          }
          
          .widget-title {
            @apply --header-title;
          }
    
          .left-slot {
            align-self: start;
          }
    
          .right-slot {
            align-self: end;
          }
          </style>
      
          <div class="widget-header-wrap">
            <div class="widget-header-data">
              <div class="left-slot">
                <slot name="position-left"></slot>
              </div>
              <div class="widget-header-title">
                <slot name="position-before-title"></slot>
                <div class="widget-title" id="widget-title" on-tap="_titleClicked">[[title]]</div>
                <slot name="position-after-title"></slot>
              </div>
              <div class="right-slot">
                <slot name="position-right"></slot>
              </div>
            </div>
          </div>
         `;

  }

  static get properties() {
    return {
      title: {
        type: String,
        value: "Widget"
      },

      isClickable: Boolean,
    }
  }

  static get observers() {
    return ['_checkIfClickable(isClickable)'];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  constructor() { super(); }

  ready() {
    super.ready();
  }

  _checkIfClickable(isClickable) {
    let widgetTitle = this.shadowRoot.querySelector('#widget-title');
    if (isClickable) {
      widgetTitle.style.cursor = "pointer";
    }
    else {
      widgetTitle.style.cursor = "default";
    }
  }

  _titleClicked(event) {
    event.preventDefault();
    if (this.isClickable) {
      this.dispatchEvent(new CustomEvent('title-click', {
        detail: {
          event: event,
          value: this.title
        }
      }));
    }
  }
}
window.customElements.define(WidgetHeader.is, WidgetHeader);