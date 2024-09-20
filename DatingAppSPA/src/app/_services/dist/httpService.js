var HttpService = /** @class */ (function () {
    function HttpService() {
    }
    HttpService.prototype.get = function (url, data) {
        return fetch(url, data)
            .then(function (x) { return x.json(); })["catch"](function (err) { return console.log(err); });
    };
    return HttpService;
}());
