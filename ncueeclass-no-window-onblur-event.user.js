// ==UserScript==
// @name         ncueeclass bypass 視窗控制
// @namespace    https://github.com/Artis24106
// @version      0.2
// @description  bypass 視窗控制
// @author       Artis24106
// @match        *://ncueeclass.ncu.edu.tw/*/*
// @icon         https://www.google.com/s2/favicons?domain=50.95
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @updateURL    https://raw.githubusercontent.com/Artis24106/artis-tampermonkey/master/ncueeclass-no-window-onblur-event.user.js
// @downloadURL  https://raw.githubusercontent.com/Artis24106/artis-tampermonkey/master/ncueeclass-no-window-onblur-event.user.js
// ==/UserScript==

var alrtScope;
if (typeof unsafeWindow === "undefined") {
    alrtScope = window;
} else {
    alrtScope = unsafeWindow;
}

alrtScope.alert = function (str) {
    console.log ("Greasemonkey intercepted alert: ", str);
    throw "H3H3";
};

//window.top.document.hasFocus = () => true;
