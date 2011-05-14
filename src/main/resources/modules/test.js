/**
 * The main module
 *
 * @context atl.general
 */
var $ = require('speakeasy/jquery').jQuery,
        storage = require('aoso/storage');
var ts = new Date().getTime();
var key = 'key' + ts;
var val1, val2

function runTests() {
    val1 = storage.getItem(key);
    console.log('GET: ' + val1);
    if (val1 != undefined) {
        alert('val1 should be undefined');
    }
    console.log('SET: ' + storage.setItem(key, 'data'));
    val2 = storage.getItem(key);
    console.log('GET: ' + val2);

    if (val2 != 'data') {
        alert('val2 : ' + val2 + ' shoud be "data"');
    }

    storage.get(key, {
                success : function(data) {
                    console.log(data);
                    if (data.data != 'data') {
                        alert("data.data is not data : " + data.data);
                    }
                }
            });

    storage.set(key + '2', {
                data : 'data2' ,
                complete : function() {
                    storage.get(key + '2', {
                        success : function(data) {
                            console.log(data);
                            if (data.data != 'data2') {
                                alert("data.data is not data2 : " + data.data);
                            }
                        }
                    });
                }
            });

    storage.remove(key + '2', {
                data : 'data2' ,
                complete : function() {
                    storage.get(key + '2', {
                        complete : function(jqXHR, textStatus) {
                            console.log(jqXHR);
                            if (jqXHR.status != 404) {
                                alert('data.data should be not found');
                            }
                        }
                    });
                }
            });


}

$(document).ready(function() {
    if (window.location.href.match(/\?test/)) {
        runTests();
    }
});
