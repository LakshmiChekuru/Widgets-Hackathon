import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
// internal libs
import '../jslibs/ajax/ajax.js';

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
      <h2>May I help you?</h2>
      <div id="div1">
      Q:<input type="text" id="Question"></input> <input type="button" on-click="_buttonClick" value="Send"></input>
      <div id="Answer"></div>      
      </div>
    `;
  }
  static get properties() {
    return {
      hide: {
        type: Boolean,
        value: true // init the value to true so it will be hidden on page load
    },
      count: {
        type: Number,
        value:1
      },
      prop1: {
        type: String,
        value: 'qna-widget',
      },
      checkValue:{
        type: String,
        value: 'check',
      },
      answer:{
        type:String,
        value:''
      }

    };
  }
  _buttonClick(){    
    const container=this.shadowRoot.querySelector('#Answer');
    if(container)
    {   
      this._getAnswer(this.shadowRoot.querySelector('#Question').value);
      container.innerHTML=this.answer;    
    }    
    
  }


  constructor() {
    super();
    this._init();
  }

  _init() {
    this._apiUrl = 'https://workspaceqna.azurewebsites.net/qnamaker/knowledgebases/e4099bc6-9135-47d6-bb73-8a348b302ab1/generateAnswer/';
  }
  
  _sendRequest(url, urlType, data, header) {
    let options = {
      url: url,
      type: typeof urlType !== 'undefined' ? urlType : 'GET',
      async: false,
      headers: header,
      crossDomain: true
    };

    if (data) {
      options.data = JSON.stringify(data);
    }

    let self = this;
       
    return new Promise((resolve, reject) => {
      atomic.ajax(options)
        .success((response, xhr) => {
          resolve(response);
          this.answer=response.answers[0].answer;
          this.shadowRoot.querySelector('#Answer').innerHTML=this.answer;
        })
        .error((err, xhr) => {
          // Define Error
        })
        .always(() => {
          // Define Default operation 
        });
    });
  }

  _getAnswer(question) {
    var url = this._apiUrl;
    var answer="";
    var urlType = "POST";
    var header = {  'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'EndpointKey 59b657f7-5084-40be-ab5a-6dfba8fe531e'};
    var data = {'question' : question};

    this._sendRequest(url, urlType, data,header)
      .then((response) => {        
        if(response)        
        this.answer = response.answers[0].answer;       
      },function (success){        
        this.answer = response.answers[0].answer;
        resolve(response);
      }, function (error) { return; });
      
  }

}

window.customElements.define('qna-widget', QnA);
