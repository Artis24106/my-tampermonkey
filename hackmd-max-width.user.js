// ==UserScript==
// @name         hackmd.io-max-width
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  晚點補
// @namespace    https://github.com/Artis24106
// @author       Artis24106
// @match        https://hackmd.io/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Artis24106/artis-tampermonkey/master/hackmd-max-width.user.js
// @downloadURL  https://raw.githubusercontent.com/Artis24106/artis-tampermonkey/master/hackmd-max-width.user.js
// ==/UserScript==

(function() {
    "use strict";
    $('.markdown-body').css("max-width", "none");
})();
