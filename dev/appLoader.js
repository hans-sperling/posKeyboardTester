/*! FileLoader - Async file loader - Version: 0.2.0 - https://github.com/hans-sperling/script-loader */
var AppLoader=function(){"use strict";function e(e){return"[object Array]"==Object.prototype.toString.call(e)}function n(e){return"[object Function]"==Object.prototype.toString.call(e)}function t(){--i||u()}function o(e){var n=document.createElement("link");return n.rel="stylesheet",n.async=!0,n.href=e,n}function r(e){var n=document.createElement("script");return n.type="text/javascript",n.async=!0,n.src=e,n}function a(e){var n=null,a=document.getElementsByTagName("head")[0],c=e.split("."),i=c[c.length-1];switch(i.toLocaleLowerCase()){case"js":n=r(e);break;case"css":n=o(e);break;default:return d(e),void t()}n.addEventListener?n.addEventListener("load",function(){l(e),t()},!1):n.attachEvent?n.attachEvent("load",function(){l(e),t()}):n.onreadystatechange=function(){n.readyState in{loaded:1,complete:1}&&(l(e),t())},n.onerror=function(){d(e),t()},a.appendChild(n)}function c(t){var o,r,c=t||{};for(e(c.files)||(c.files=[]),n(c.onFileLoaded)||(c.onFileLoaded=function(){}),n(c.onAllLoaded)||(c.onAllLoaded=function(){}),n(c.onError)||(c.onError=function(){}),r=c.files.length,i=r,l=c.onFileLoaded,u=c.onAllLoaded,d=c.onError,o=0;r>o;o++)a(c.files[o])}var i=0,l=function(){},u=function(){},d=function(){};return{require:c}};
/* http://beeker.io/jquery-document-ready-equivalent-vanilla-javascript */
var domReady=function(a){var b=!1,c=function(){document.addEventListener?(document.removeEventListener("DOMContentLoaded",d),window.removeEventListener("load",d)):(document.detachEvent("onreadystatechange",d),window.detachEvent("onload",d))},d=function(){b||!document.addEventListener&&"load"!==event.type&&"complete"!==document.readyState||(b=!0,c(),a())};if("complete"===document.readyState)a();else if(document.addEventListener)document.addEventListener("DOMContentLoaded",d),window.addEventListener("load",d);else{document.attachEvent("onreadystatechange",d),window.attachEvent("onload",d);var e=!1;try{e=null==window.frameElement&&document.documentElement}catch(f){}e&&e.doScroll&&!function g(){if(!b){try{e.doScroll("left")}catch(d){return setTimeout(g,50)}b=!0,c(),a()}}()}};

domReady(function() {
    'use strict';

    var appLoader = new AppLoader();

    appLoader.require({
        files : [

            // Styling
            './dev/css/reset.css',
            './dev/css/layout.css',

            // Vendor scripts
            './dev/js/vendor/jquery.js',

            // Appkication
            './dev/js/app.js'
        ],
        onAllLoaded  : function onAllLoaded() {
            new PosKeyboardTester();
        },
        onError      : function onError(file) {
            console.warn('File <' + file + '> has not been loaded!');
        }
        //onFileLoaded : onFileLoaded,
    });
});
