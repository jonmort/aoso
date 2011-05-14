ActiveObjects StOrage for Speakeasy
===================================
AOSO is a plugin that provides storage mimicking the HTML 5 LocalStorage API. Also provided are asynchronous methods to get, set, remove and search
 for entries. Active Objects is used for data storage. Data can be stored on a per user basis and globally (shared by all users).


Supported Products
------------------
All Atlassian products that support the Plugins v2 framework, Speakeasy and the Active Objects Plugin

Installation Instructions
-------------------------

1. Install [Speakeasy](http://confluence.atlassian.com/display/DEVNET/Speakeasy+Install+Guide)
2. Install [Active Objects](http://studio.atlassian.com/wiki/display/AO/Installing+Active+Objects)
3. Download [aoso-1.0.jar](https://github.com/downloads/jonmort/aoso/aoso-1.0.jar)
4. Upload `aoso-1.0.jar` as a plugin


Usage
-----

See the Common JS speakeasy tab for API documentation.

See https://github.com/jonmort/pomodoro-extension/tree/master/js/pomodoro for an example of how to add optional support for aoso and fallback to localStorage

Development
-----------

The [Atlassian Plugin SDK](http://confluence.atlassian.com/display/DEVNET/Developing+your+Plugin+using+the+Atlassian+Plugin+SDK) is used.
 It is a standard plugin.

Testing - hit any page with the ?testaoso appended to the url and the tests will run.
