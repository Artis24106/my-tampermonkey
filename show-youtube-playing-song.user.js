// ==UserScript==
// @name         Show Youtube Playing Song
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Show the song name that you are playing in Youtube in the bottom-right corner!
// @namespace    https://github.com/Artis24106
// @author       Artis24106
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @updateURL    https://raw.githubusercontent.com/Artis24106/artis-tampermonkey/master/show-youtube-playing-song.user.js
// @downloadURL  https://raw.githubusercontent.com/Artis24106/artis-tampermonkey/master/show-youtube-playing-song.user.js

// ==/UserScript==
String.prototype.format = function() {
    var a = this;
    for (var k in arguments) {
        a = a.replace("{" + k + "}", arguments[k]);
    }
    return a;
};
var hash = function(s) {
    /* Simple hash function. */
    var a = 1,
        c = 0,
        h,
        o;
    if (s) {
        a = 0;
        /*jshint plusplus:false bitwise:false*/
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = ((a << 6) & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ (c >> 21) : a;
        }
    }
    return String(a);
};

const xSongName = "kotoha";
const xTabID = "miku";
const serverRefreshTime = 2500;
const clientRefreshTime = 1222;
var tabSet = new Map();

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName("head")[0];
    if (!head) {
        return;
    }
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
}
function addCSS() {
    addGlobalStyle(
        "#finder-container { position: fixed; bottom: 0px; right: 0px; border-radius: .5rem; background-color: rgba(51, 51, 51, 0.5); backdrop-filter: saturate(180%) blur(20px); webkit-backdrop-filter: saturate(180%) blur(20px); z-index: 99999;  color: white; font-family: consolas !important; box-shadow: 0px 0px 2px #888888;}"
    );
    addGlobalStyle(
        ".finder-li { margin-bottom: -1px; list-style-type: none; color: white !important; font-size: 1rem !important;}"
    );
    addGlobalStyle(
        "#finder-header { margin-top: 5px; margin-bottom: 5px; text-align: center; color: white !important; font-family: consolas !important; font-size: .1rem !important;}"
    );
    addGlobalStyle(
        "#finder-container>:last-child>div:hover { border-bottom-left-radius: .5rem; border-bottom-right-radius: .5rem;}"
    );
    addGlobalStyle(
        "#finder-container>:first-child>div:hover { border-top-left-radius: .5rem; border-top-right-radius: .5rem;}"
    );
    addGlobalStyle(
        ".finder-li>div { display: block; border-top: solid 1px #777; padding: 5px 10px; color: white !important; text-decoration: none; font-size: .1rem !important;}"
    );
    addGlobalStyle("#finder-container>:first-child>div { border-top: none }");
    addGlobalStyle(".finder-li>div:hover { background-color: #888; }");
}
function addBasicHTML() {
    $(":first-child>body").append('<div id="finder-container"></div>');
    //$('#finder-container').append('<h1 id="finder-header">Now Playing</h1>');
}
function appendList(id, el) {
    var listTmpl = '<li id={0} class="finder-li"><div>{1}</div></li>'.format(
        id,
        el
    );
    $("#finder-container").append(listTmpl);
}
function changeList(id, el) {
    $("#{0}>div".format(id)).text(el);
}
function clearList() {
    $(".finder-li").remove();
}
function removeList(id) {
    $("#{0}".format(id)).remove();
}
function getHTML() {
    return $("body").html();
}
function getSongName() {
    return $("h1.title")
        .text()
        .trim();
}

(function() {
    if (location.href.includes("youtube")) {
        var tabID = Date.now(),
            songName = getSongName();
        GM_setValue(xSongName, songName);
        setInterval(() => {
            songName = getSongName();
            if (songName != "") {
                GM_setValue(xTabID, tabID);
                GM_setValue(xSongName, songName);
            }
        }, serverRefreshTime - Math.floor(Math.random() * 1000));
    } else {
        addCSS();
        addBasicHTML();
        var id = GM_getValue(xTabID),
            name = GM_getValue(xSongName);
        appendList(id, name);
        tabSet.set(id, [name, 0]);
        setInterval(() => {
            (id = GM_getValue(xTabID)), (name = GM_getValue(xSongName));
            console.log([id, name]);
            if (!tabSet.has(id)) {
                tabSet.set(id, name);
                appendList(id, name);
            } else {
                tabSet.set(id, [tabSet.get(id)[0], 2.5 * tabSet.size]);
                changeList(id, name);
            }

            // Iterate all map
            for (let i of tabSet.keys()) {
                var [tmpName, tmpTTD] = tabSet.get(i);
                if (tmpTTD <= 0) {
                    console.log([tmpName, tmpTTD]);
                    tabSet.delete(i);
                    removeList(i);
                    break;
                } else {
                    tabSet.set(i, [tmpName, tmpTTD - 1]);
                }
            }
        }, clientRefreshTime);
    }
})();
