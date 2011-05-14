/**
 * Storage api for speakeasy
 *
 * @public
 */

/*global require, exports */

var $ = require('speakeasy/jquery').jQuery;

function storageUrl(key) {
    return getBaseUrl() + '/rest/aoso/1.0/store/user/' + key + '.json';
}

function searchUrl(key, limit, offset) {
    return getBaseUrl() + '/rest/aoso/1.0/search/user/' + key + '.json?limit=' + limit + '&offset=' + offset;
}

function getItem(key) {
    var response = get(key, {async : false});
    if (response.status == 200) {
        return $.parseJSON(response.responseText).data;
    }
}

function setItem(key, value) {
    return set(key, {data : value, async : false});
}

function removeItem(key) {
    return remove(key, {async : false});
}

function get(key, options) {
    return makeRequest(key, options, 'GET');
}

function set(key, options) {
    return makeRequest(key, options, 'PUT');
}

function remove(key, options) {
    return makeRequest(key, options, 'DELETE');
}

function makeRequest(key, options, type) {
    var settings = {url : storageUrl(key),
        dataType : 'json',
        type : type
    };

    console.debug(type + ' : ' + key);
    return $.ajax($.extend({}, options || {}, settings));
}


function getBaseUrl() {
    return window.contextPath;
}

function search(search, success, limit, offset, error, complete) {
    limit = limit || 10;
    offset = offset || 0;
    return $.ajax({url:searchUrl(search, limit, offset),
                type : 'GET',
                success : success,
                error : error,
                complete : complete
            });
}

function search(prefix, options) {
    var url = searchUrl(query, options['limit'] || 10, options['offset'] || 0);
    return $.ajax(url, options);
}


/**
 * localStorage equivalent
 * getItem(key)
 */
exports.getItem = getItem;

/**
 * localStorage equivalent
 * setItem(key, data)
 */
exports.setItem = setItem;

/**
 * localStorage equivalent
 * removeItem(key)
 */
exports.removeItem = removeItem;

/**
 * searches for values with a specific prefix
 *
 * Takes 2 arguments
 * prefix : item to search for - this is the prefix to search for only
 * options : options to pass to jQuery.ajax() with the addition of limit and offset,
 * which are used to reduce the number of items returned and the first item to return (for paging).
 * e.g.
 * withPrefix('page', { limit : 5, offset : 5, success : function(data) { alert(data); }, error : function() { alert('failed'); } });
 */
exports.withPrefix = search;

/**
 * More customisable get. Takes 2 arguments
 * key : the data key to get
 * options : options to pass to jQuery.ajax() use success, error and complete for callbacks
 */
exports.get = get

/**
 * More customisable set. Takes 3 arguments
 * key : the data key to set
 * options : options to pass to jQuery.ajax() use success, error and complete for callbacks. Set data to be the data to set.
 * e.g.
 * set('my-key', {data: 'data to set', success : function(data) { alert(data); }, error : function() { alert('failed'); } });
 */
exports.set = set

/**
 * More customisable remove. Takes 2 arguments
 * key : the data key to set
 * options : options to pass to jQuery.ajax() use success, error and complete for callbacks.
 */
exports.remove = remove
