// ==UserScript==
// @name         Arcaea Online Exact PTT
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get the exact ptt value and other information!!
// @author       artis24106
// @match        https://arcaea.lowiro.com/*/profile/potential
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lowiro.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let ptt_list = [];
    let orig_console_log = console.log;
    console.log = function () {
        let args = Array.prototype.slice.call(arguments);
        orig_console_log.apply(console, args);
        try {
            if (!args[0].startsWith("[+] ")) return;
        } catch (e) {
            return;
        };

        let data = args[0].split(", ");
        let cur_ptt = parseFloat(data[2]);
        ptt_list.push(cur_ptt);

        if (ptt_list.length != 40) return;

        let b30_list = ptt_list.slice(0, 30);
        let r10_list = ptt_list.slice(30, 40);
        let ptt_sum = ptt_list.reduce((a, b) => a + b, 0);
        let b30 = (b30_list.reduce((a, b) => a + b, 0) / b30_list.length) || 0;
        let r10 = (r10_list.reduce((a, b) => a + b, 0) / r10_list.length) || 0;
        let ptt = (ptt_sum / ptt_list.length) || 0;
        let next_ptt_sum = 40 * (parseInt(ptt * 100) + 1) / 100;
        let need_score = 80000 * (next_ptt_sum - ptt_sum) / 0.4;

        console.warn("[RESULT]" +
            "\nb30: " + b30 +
            "\nr10: " + r10 +
            "\nptt: " + ptt +
            "\nscore to next ptt: " + need_score);
    };

})();
