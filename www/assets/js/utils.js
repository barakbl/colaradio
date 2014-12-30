/**
 * Created by chenasraf on 12/29/14.
 */
String.prototype.capitalize = function() {
    return this.split(' ').map(function(item) {
        if (!item.length) return '';
        return item[0].toUpperCase() + item.substr(1);
    }).join(' ');
};

function getCookies() {
    var rawCookies = document.cookie.split(';');
    var cookies = {};
    for (var cookie in rawCookies) {
        var split = rawCookies[cookie].split('=');
        cookies[split[0]] = split[1];
    }
    return cookies;
}

function getCookie(name) {
    var cookies = getCookies();
    for (var cookie in cookies) {
        if (cookie.trim() == name.trim())
            return cookies[cookie];
    }
    return undefined;
}