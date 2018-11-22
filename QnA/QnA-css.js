const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="QnA-styles">
	<template>
		<style>
		.chat
		{
			list-style: none;
			margin-left: 5px;
			margin-right: 5px;
			padding: 0;
		}

		.chat li
		{
			margin-bottom: 5px;
			padding-bottom: 25px;
			border-bottom: 1px dotted #B3A9A9;
		}

		.chat li.left .chat-body
		{
			margin-left: 60px;
		}

		
		.chat li.right .chat-body
		{
			margin-right: 60px;
		}

		.chat li .chat-body p
		{
			margin: 0;
			color: #777777;
		}

		.user {
			text-align: left;
		}

		.bot {
			text-align: right;
		}
		.panel .slidedown .glyphicon, .chat .glyphicon
		{
			margin-right: 5px;
		}
		.overflow-container {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
	 }
	 .widget-logo {
		margin-top: 15px;
		margin-left: 5px;
		font-size: 16px !important;
}
  
		widget-header {
			--header-background-color: #f8f8f8;
			--header-font-color: #333;
			logo-background: url('../KYA.JPG');
			--header-alignment: left;
			 --header-title: {
				overflow: hidden;
			  text-overflow: ellipsis;
			  padding-left: 10px;
			}
			max-width: 100%;				
		  }
		.panel-body
		{
			padding-top: 10px;
			overflow-y: scroll;			
			height:450px;
		}

		::-webkit-scrollbar-track
		{
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
			background-color: #F5F5F5;
		}

		::-webkit-scrollbar
		{
			width: 12px;
			background-color: #F5F5F5;
		}

		::-webkit-scrollbar-thumb
		{
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
			--background-color: #555;
			background-color: #b0b5bc;
		}

		.pull-left {
			float: left;
		}
				
		.pull-right {
			float: right;
		}
		
		.img-circle {
		-webkit-border-radius: 500px;
			-moz-border-radius: 500px;
				border-radius: 500px;
		}

		.btn {
			display: inline-block;
			*display: inline;
			padding: 4px 12px;
			margin-bottom: 0;
			*margin-left: .3em;
			font-size: 14px;
			line-height: 20px;
			--color: #176ab6;
			color: #333333;
			text-align: center;
			text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
			vertical-align: middle;
			cursor: pointer;
			background-color: #f5f5f5;
			*background-color: #e6e6e6;
			background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
			background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
			background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
			background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
			background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
			background-repeat: repeat-x;
			border: 1px solid #cccccc;
			*border: 0;
			border-color: #e6e6e6 #e6e6e6 #bfbfbf;
			border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
			border-bottom-color: #b3b3b3;
			-webkit-border-radius: 4px;
			-moz-border-radius: 4px;
					border-radius: 4px;
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);
			filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
			*zoom: 1;
			-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
			-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
					box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
		}
		
		.btn:hover,
		.btn:focus,
		.btn:active,
		.btn.active,
		.btn.disabled,
		.btn[disabled] {
			color: #333333;
			background-color: #e6e6e6;
			*background-color: #d9d9d9;
		}
		
		.btn:active,
		.btn.active {
			background-color: #cccccc \9;
		}
  
		.btn-warning {
			color: #ffffff;
			text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
			--background-color: #faa732;
			background-color: #176ab6;
			*background-color: #f89406;
			background-image: -moz-linear-gradient(top, #78c1e2, #176ab6);
			background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#78c1e2), to(#176ab6));
			background-image: -webkit-linear-gradient(top, #78c1e2, #176ab6);
			background-image: -o-linear-gradient(top, #78c1e2, #176ab6);
			background-image: linear-gradient(to bottom, #78c1e2, #176ab6);
			background-repeat: repeat-x;
			border-color: #176ab6 #176ab6 #ad6704;
			border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffbb450', endColorstr='#fff89406', GradientType=0);
			filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
		  }
		  

		  .input-group {
			  position : relative;
			  display : table;
			  border-collapse : seperate;
			  width:100%;
			  margin-top : 15px;
			  margin-left : 15px;
		  }

		  .input-group .form-control {
			position: relative;
			z-index: 2;
			float: left;
			width: 75%;
			margin-bottom: 0;
			margin-right:15px;
		  }
		  

		  .input-sm {
			height: 30px;
			padding: 5px 10px;
			font-size: 12px;
			line-height: 1.5;
		  }
		  
		  .input-group-btn {
			  float:left;
		  }
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
