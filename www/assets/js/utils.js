/**
 * Created by chenasraf on 12/29/14.
 */
String.prototype.capitalize = function() {
    return this.split(' ').map(function(item) {
        if (!item.length) return '';
        return item[0].toUpperCase() + item.substr(1);
    }).join(' ');
};

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
    return JSON.parse(this.getItem(key));
};