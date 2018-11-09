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
    <link rel="stylesheet" href="../QnA/QnA.css">
      <div class="row">
        <div class="col-sm-3 col-sm-offset-4 frame">
          <ul id="MessageList"></ul>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3 col-sm-offset-4 frameinput">
          <div>
            <div class="msj-rta macro" style="margin:auto">                        
                <div class="text text-r" style="background:whitesmoke !important">
                    <input class="mytext" placeholder="May I help you?" id="question"/>
                </div> 
            </div>
            <input type="button" on-click="_questionButtonClick" value="Send"></input>
          </div>
        </div>
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
  
  constructor() {
    super();
    this._init();
  }

  _init() {
    this._apiUrl = 'https://workspaceqna.azurewebsites.net/qnamaker/knowledgebases/e4099bc6-9135-47d6-bb73-8a348b302ab1/generateAnswer/';
  }

  _questionButtonClick(){
    this._insertChat("user",this.shadowRoot.querySelector('#question').value,5);
    this._getAnswer(this.shadowRoot.querySelector('#question').value);
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
          this._insertChat("QnAbot",this.answer,5);
        })
        .error((err, xhr) => {
          // Define Error
        })
        .always(() => {
          // Define Default operation 
        });
    });
  }

  _formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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
    var date = this._formatAMPM(new Date());
    
    var textnode;
    // Date Node
    var smallNode =  document.createElement("small");                   
    textnode = document.createTextNode(date);
    smallNode.appendChild(textnode);   
    var dateNode =  document.createElement("p");                   
    dateNode.appendChild(smallNode); 
    // Answer Node
    var answerNode =  document.createElement("p");                   
    textnode = document.createTextNode(text);
    answerNode.appendChild(textnode);  
    // Wrapper Div Node 
    var answerChildDivNode =  document.createElement("div");
    answerChildDivNode.setAttribute("class","text text-r"); 
    answerChildDivNode.appendChild(answerNode);   
    if (who == "user"){
      var replyChildDivNode =  document.createElement("div");
      replyChildDivNode.setAttribute("class","avatar"); 
      replyChildDivNode.setAttribute("style","padding:0px 0px 0px 10px !important"); 
      replyChildDivNode.appendChild(answerChildDivNode); 
      var answerParentDivNode =  document.createElement("div");
      answerParentDivNode.setAttribute("class","msj-rta macro"); 
      answerParentDivNode.appendChild(replyChildDivNode);
    }
    else {
      var answerParentDivNode =  document.createElement("div");
      answerParentDivNode.setAttribute("class","msj-rta macro"); 
      answerParentDivNode.appendChild(answerChildDivNode);
    }
      
    // li Node
    var node = document.createElement("li");
    node.setAttribute("width","100%"); 
    node.appendChild(answerParentDivNode);   

    this.shadowRoot.querySelector('#MessageList').appendChild(node);
  }
}

window.customElements.define('qna-widget', QnA);
