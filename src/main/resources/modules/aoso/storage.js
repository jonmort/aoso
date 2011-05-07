/**
 * Storage api for speakeasy
 *
 * @public
 */

/*global require, exports */

var $ = require("speakeasy/jquery").jQuery,
        staticResourcesPrefix = require("speakeasy/host").staticResourcesPrefix;

function storageUrl(key) {
    return getBaseUrl() + "/rest/aoso/1.0/store/user/" + key +  '.json';
}

function searchUrl(key, limit, offset) {
    return getBaseUrl() + "/rest/aoso/1.0/search/user/" + key +  ".json?limit=" + limit + "&offset=" + offset;
}

function getItem(key) {
    var value;
    console.debug("get " + key);
    $.ajax({url: storageUrl(key),
                   type: "GET",
                   dataType: "json",
                   async: false,
                   success:function(data) {
                       value = data.data;
                   },
                   error : function() {
                       value = "";
                   }
    });

    return value;
}

function setItem(key, value) {
    console.debug("set " + key + " " + value);
    $.ajax({url:storageUrl(key),
            data:value,
            type:"PUT",
            async: false});
}

function getBaseUrl() {
    var match = staticResourcesPrefix.match(/(.*)\/s\/.*/);
    if (match) {
        return match[1];
    }
    return "";
}

function removeItem(key) {
    $.ajax({url:storageUrl(key),
            type:"DELETE",
            async: false});
}

function defaultIfUndefined(val, def) {
    return typeof(val) != 'undefined' ? val : def;
}

function search(search, success, limit, offset, error) {
    limit = defaultIfUndefined(limit, 10);
    offset = defaultIfUndefined(offset, 0);
    return $.ajax({url:searchUrl(search, limit, offset),
            type : "GET",
            success : success,
            error : error
        });
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
 * searches for values
 */
exports.search = search;
