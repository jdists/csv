"use strict";
var csvSync = require("csv-parse/lib/sync");
var yaml = require("js-yaml");
module.exports = (function (content, attrs, scope) {
    if (!content) {
        return content;
    }
    var data = csvSync(content, {
        trim: true,
        auto_parse: true,
    });
    var headers;
    if (attrs.headers === undefined) {
        headers = data.shift();
    }
    else {
        var t = scope.execImport(attrs.headers, true);
        if (typeof t === 'string') {
            headers = csvSync(t, {
                trim: true,
            })[0];
        }
        else if (t instanceof Array) {
            headers = t;
        }
    }
    var result;
    if (headers) {
        result = data.map(function (record) {
            var item = {};
            record.forEach(function (sub, index) {
                item[headers[index]] = sub;
            });
            return item;
        });
    }
    else {
        result = data;
    }
    return yaml.safeDump(result);
});
