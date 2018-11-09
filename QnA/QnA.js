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
      Q:<input type="text" id="Q1"></input> <input type="button" on-click="_buttonClick" value="Send"></input>
      <div id="A1"></div>      
      </div>



      <div id="template" hidden$="{{hide}}">
      Q:<input type="text" id="Q1"></input> <input type="button" on-click="_buttonClick" value="Send"></input>
      <div></div>      
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
    const container=this.shadowRoot.querySelector('#' + 'A'+this.count);
    if(container)
    {   
      this._getAnswer(this.shadowRoot.querySelector('#' + 'Q'+this.count).value);
      container.innerHTML=this.answer;    
    } 
    
    var cloned=this._cloneTemplate();
    console.log("cloned count=" +cloned.childNodes.count);
    const lastDIV=this.shadowRoot.querySelector('#' + 'div'+this.count);
    lastDIV.parentNode.appendChild(cloned);
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
          this.shadowRoot.querySelector('#' + 'A'+this.count).innerHTML=this.answer;
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
    var data = {'question' : 'which bank supported ?'};

    this._sendRequest(url, urlType, data,header)
      .then((response) => {        
        if(response)
        //answer= response.answers[0].answer;
        this.answer = response.answers[0].answer;
        //resolve(response);
      
       // Define response
       
      },function (success){
        //answer= response.answers[0].answer;
        this.answer = response.answers[0].answer;
        resolve(response);
      }, function (error) { return; });
      
  }

  _cloneTemplate(){
    const container = this.shadowRoot.querySelector('#template');
    var ret = container.cloneNode();
    var lightDom;
    var childNodes;
    var nextCount=this.count+1;
    //ret.attributes.setNamedItem("id").value="div"+nextCount;
    console.log(ret.attributes.getNamedItem("id").value);
    //lightDom = Polymer.dom(ret);
    childNodes = container.childNodes;
    for (var i = 0; i < childNodes.length; i++) {      
      ret.appendChild(childNodes[i].cloneNode());
    }    
    return ret;
  }

  


  _createAnswerData(htmlId) {
    const container = this.shadowRoot.querySelector('#' + htmlId);
    if (container) {
      
        let option = document.createElement('option');
        option.textContent = item;
        option.value = item;
        option.selected = optionRangeSelected ? this._setSelected(this.opportunityrange, item) : this._setSelected(this.opportunityfilter, item);
        container.appendChild(option);      
    }
  }
}

window.customElements.define('qna-widget', QnA);
