/**
 * The main module
 *
 * @context atl.general
 */
var $ = require('speakeasy/jquery').jQuery,
        storage = require('aoso/storage');
var ts = new Date().getTime();
var key = 'key' + ts;
var val1, val2;

function createSearchTestData(scope) {
    var i = 0;
    for (i = 0; i < 10; i++) {
        storage.set('search/' + ts + '/' + i, {
                    data : 'search' + i,
                    scope : scope,
                    async : false
                });
    }
}

function runUserTests() {
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
                        alert('data.data is not data : ' + data.data);
                    }
                    storage.remove(data.key);
                }
            });

    storage.set(key + '2', {
                data : 'data2' ,
                complete : function() {
                    storage.get(key + '2', {
                                success : function(data) {
                                    console.log(data);
                                    if (data.data != 'data2') {
                                        alert('data.data is not data2 : ' + data.data);
                                    }
                                },
                                complete : function() {
                                    storage.remove(key + '2', {
                                                data : 'data2' ,
                                                complete : function() {
                                                    storage.get(key + '2', {
                                                                complete : function(jqXHR) {
                                                                    console.log(jqXHR);
                                                                    if (jqXHR.status != 404) {
                                                                        alert('data.data should be not found');
                                                                    }
                                                                }
                                                            });
                                                }
                                            });
                                }
                            });
                }
            });


    createSearchTestData('user');

    storage.withPrefix('search/' + ts, {
                success : function(data) {
                    if (data.length != 10) {
                        alert('Expecting 10 results got: ' + data.length)
                    }
                    console.log(data);
                },
                complete : function() {
                    storage.withPrefix('search/' + ts, {
                                limit : 5,
                                offset : 5,
                                success : function(data) {
                                    if (data.length != 5) {
                                        alert('Expecting 5 results got: ' + data.length)
                                    }
                                    if (data[0].data != 'search5') {
                                        alert('Expecting search5 got : ' + data[0].data);
                                    }
                                    console.log(data);

                                    $.each(data, function(index, d) {
                                        console.log(d);
                                        storage.remove(d.key);
                                    });
                                }
                            });
                }
            });
}

function runScopeTests() {
    storage.set(key + '2', {
                scope : 'test',
                data : 'data2' ,
                complete : function() {
                    storage.get(key + '2', {
                                success : function(data) {
                                    console.log(data);
                                    if (data.data != 'data2') {
                                        alert('data.data is not data2 : ' + data.data);
                                    }
                                },
                                complete : function() {
                                    storage.remove(key + '2', {
                                                scope : 'test',
                                                data : 'data2' ,
                                                complete : function() {
                                                    storage.get(key + '2', {
                                                                complete : function(jqXHR) {
                                                                    console.log(jqXHR);
                                                                    if (jqXHR.status != 404) {
                                                                        alert('data.data should be not found');
                                                                    }
                                                                }
                                                            });
                                                }
                                            });
                                }
                            });
                }
            });


    createSearchTestData('test');

    storage.withPrefix('search/' + ts, {
                scope : 'test',
                success : function(data) {
                    if (data.length != 10) {
                        alert('Expecting 10 results got: ' + data.length)
                    }
                    console.log(data);
                },
                complete : function() {
                    storage.withPrefix('search/' + ts, {
                                scope : 'test',
                                limit : 5,
                                offset : 5,
                                success : function(data) {
                                    if (data.length != 5) {
                                        alert('Expecting 5 results got: ' + data.length)
                                    }
                                    if (data[0].data != 'search5') {
                                        alert('Expecting search5 got : ' + data[0].data);
                                    }
                                    console.log(data);

                                    $.each(data, function(index, d) {
                                        console.log(d);
                                        storage.remove(d.key, {
                                            scope : 'test'
                                        });
                                    });
                                }
                            });
                }
            });
}

$(document).ready(function() {
    if (window.location.href.match(/\?testaoso/)) {
        runUserTests();
        runScopeTests();
    }
});
