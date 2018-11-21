import { html, PolymerElement } from '@polymer/polymer/polymer-element';
const styleElement = document.createElement('dom-module');
styleElement.innerHTML =
  `<template>
		<style>
			/* ----------------Misc Styles reusable/Common Styles ----------------------------*/

			* {
				margin: 0;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
			}

			:host {
				display: block;
				position: relative;
				height: 100%;
				font-family: sans-serif;
			}

			paper-progress {
				display: block;
				width: 100%;
				position: absolute;
				z-index: 1;
			}

			paper-progress.slow {
				--paper-progress-indeterminate-cycle-duration: 2s;
			}

			paper-progress.blue {
				--paper-progress-active-color: var(--paper-light-blue-500);
        --paper-progress-secondary-color: var(--paper-light-blue-100);
        --paper-progress-container-color: transparent;
			}

			.thin-scroll::-webkit-scrollbar {
				width: 5px;
			}

			.thin-scroll::-webkit-scrollbar-track {
				background: #FFFFFF;
			}

			.thin-scroll::-webkit-scrollbar-thumb {
				background: #BBBBBB;
      }
      
      .ios-scrollable-filter {
        overflow-y: scroll !important; /* has to be scroll, not auto - for iOS devices */
        -webkit-overflow-scrolling: touch !important;
      }
		</style>
	</template>`;
styleElement.register('shared-styles'); 