/**
 * Created by chenasraf on 12/29/14.
 */
String.prototype.capitalize = function() {
    return this.split(' ').map(function(item) {
       return item[0].toUpperCase() + item.substr(1);
    }).join(' ');
};