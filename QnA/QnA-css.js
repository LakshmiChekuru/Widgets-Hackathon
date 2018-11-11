const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="QnA-styles">
	<template>
		<style>
		.mytext{
			border:0;padding:10px;background:whitesmoke;
		}
		.text{
			width:75%;display:flex;flex-direction:column;
		}
		.text > p:first-of-type{
			width:100%;margin-top:0;margin-bottom:auto;line-height: 13px;font-size: 12px;
		}
		.text > p:last-of-type{
			width:100%;text-align:right;color:silver;margin-bottom:-7px;margin-top:auto;
		}
		.text-l{
			float:left;padding-right:10px;
		}        
		.text-r{
			float:right;padding-left:10px;
		}
		.avatar{
			display:flex;
			justify-content:center;
			align-items:center;
			width:25%;
			float:left;
			padding-right:10px;
		}
		.macro{
			margin-top:5px;
			width:85%;
			/* width:auto; */
			border-radius:5px;padding:5px;display:flex;
		}
		.msj-rta{
			float:right;background:whitesmoke;
		}
		.msj{
			float:left;background:white;
		}
		.frame{
			background:#e0e0de;
			height:200px;
			overflow:hidden;
			padding:0;
		}
		.frame > div:last-of-type{
			/* position:absolute; */
			bottom:5px;width:100%;display:flex;
		}
		.frameinput{
			background:#e0e0de;
			height:50px;
			overflow:hidden;
			padding:0;
		}
		.frameinput > div:last-of-type{
			/* position:absolute; */
			bottom:5px;width:100%;display:flex;
		}
		ul {
			width:85%;
			list-style-type: none;
			padding:18px;
			/* position:absolute; */
			bottom:32px;
			display:flex;
			flex-direction: column;
			height: 140px;
			overflow:hidden; 
			overflow-y:scroll;
			-webkit-overflow-scrolling: touch;
		}
		.msj:before{
			width: 0;
			height: 0;
			content:"";
			top:-5px;
			left:-14px;
			position:relative;
			border-style: solid;
			border-width: 0 13px 13px 0;
			border-color: transparent #ffffff transparent transparent;            
		}
		.msj-rta:after{
			width: 0;
			height: 0;
			content:"";
			top:-5px;
			left:14px;
			position:relative;
			border-style: solid;
			border-width: 13px 13px 0 0;
			border-color: whitesmoke transparent transparent transparent;           
		}  
		input:focus{
			outline: none;
		}        
		::-webkit-input-placeholder { /* Chrome/Opera/Safari */
			color: #d4d4d4;
		}
		::-moz-placeholder { /* Firefox 19+ */
			color: #d4d4d4;
		}
		:-ms-input-placeholder { /* IE 10+ */
			color: #d4d4d4;
		}
		:-moz-placeholder { /* Firefox 18- */
			color: #d4d4d4;
		}   
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
