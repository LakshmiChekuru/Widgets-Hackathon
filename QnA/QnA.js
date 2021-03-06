import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
// internal libs
import '../jslibs/ajax/ajax.js';

import './QnA-css';
import './shared-styles';
// internal web components
import '../components/widget-error/widget-error';
import '../components/widget-header/widget-header';
// third party web components
import '@polymer/promise-polyfill/promise-polyfill-lite.js';
import '@polymer/paper-progress/paper-progress';
//import '@polymer/iron-list/iron-list.js';

class QnA extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles QnA-styles"></style>
    <widget-header title="[[_title]]" class="overflow-container">
	<i slot="position-before-title" class="fa fa-history widget-logo"><img src="./AssetsPortal/img/widgets/qna/ChatIcon.jpeg"></img></i>
</widget-header>

<paper-progress indeterminate class="slow blue" disabled="{{!_isLoading}}"></paper-progress>

    <div class="panel-body">
      <ul class="chat" id="MessageList">
      </ul>
    </div>
    <div class="input-group">
        <input type="text" id="question" class="form-control input-sm" on-keydown="_handleEvent" placeholder="How may I help you ?" />
        <span class="input-group-btn">
            <button class="btn btn-warning" on-click="_questionButtonClick" id="btn-chat">
                Send</button>
        </span>
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
      },
      _title: {
        type: String,
        value: 'ChatBOT'
      },
      _isLoading: {
        type: Boolean,
        value: false
      },
      _message: {
        type: String,
        value: ''
      }

    };
  }
  
  constructor() {
    super();
    this._init();
  }

  _init() {
    this._apiUrl = 'https://workspaceqna.azurewebsites.net/qnamaker/knowledgebases/e4099bc6-9135-47d6-bb73-8a348b302ab1/generateAnswer/';
  }

  _handleEvent(event) {
    if(event.keyCode == 13) {
      this._questionButtonClick();
    }
  }

  _questionButtonClick(){
    this._insertChat("user",this.shadowRoot.querySelector('#question').value,5);
    this._getAnswer(this.shadowRoot.querySelector('#question').value);
    this.shadowRoot.querySelector('#question').value = "";
  }
  
  _sendRequest(url, urlType, data, header) {
    this._isLoading = true;
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
          this._insertChat("QnAbot",this.answer,5);
        })
        .error((err, xhr) => {
          // Define Error
        })
        .always(() => {
          this._isLoading = false;
          this._clearMessage();
        });
    });
  }
  _clearMessage() {
    this._message = '';
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

  _insertChat(who, text){
    
    var control = ''; 
    var textnode;
    // Question or Answer Node
    var answerNode =  document.createElement("p");
    
    var pattFull=/\[[\w\s]*\]\((http|https|ftp|ftps|www)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*\))?(\))?/g;
    var patternLink=/\[[\w\s]*\]/g; 
    var patternUrl=/\((http|https|ftp|ftps|www)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*\))?(\))?/g;
    var anchr="";
    if(pattFull.test(text)) {
        var fullStr=text.match(pattFull).toString(); //[here](http:)
        var linkText=fullStr.match(patternLink).toString(); //[here]
        linkText=linkText.substr(1, linkText.length-2); //here
        var url=fullStr.match(patternUrl).toString();
        url=url.substr(1, url.length-2);      
        anchr='<a target="_blank" href="'+url+'">'+linkText+'</a> ';
        text= text.replace(fullStr, anchr);      
    }              
    
    answerNode.innerHTML=text; 
    // Wrapper Div Node 
    var answerChildDivNode =  document.createElement("div");
    answerChildDivNode.setAttribute("class","chat-body clearfix"); 
    

    // Question or Answer Node
    var listNode = document.createElement("li");
    var imgSpanNode =  document.createElement("span");                   
    var imgNode =  document.createElement("img");      

    imgNode.setAttribute("alt","User Avatar"); 
    imgNode.setAttribute("class","img-circle"); 

    if (who == "user"){
      answerNode.setAttribute("class","user");
      imgNode.setAttribute("src","./AssetsPortal/img/widgets/qna/User.png");       
      imgSpanNode.setAttribute("class","chat-img pull-left"); 
      listNode.setAttribute("class","left clearfix");
    }
    else {
      answerNode.setAttribute("class","bot");
      imgNode.setAttribute("src","./AssetsPortal/img/widgets/qna/BOT.png");      
      imgSpanNode.setAttribute("class","chat-img pull-right"); 
      listNode.setAttribute("class","right clearfix"); 
    }   

    answerChildDivNode.appendChild(answerNode);  
    imgSpanNode.appendChild(imgNode); 

    listNode.appendChild(imgSpanNode); 
    listNode.appendChild(answerChildDivNode); 

    this.shadowRoot.querySelector('#MessageList').appendChild(listNode);
    var chatDIV=this.shadowRoot.querySelector('.panel-body');    
    chatDIV.scrollTop = chatDIV.scrollHeight;
  }
}

window.customElements.define('qna-widget', QnA);
