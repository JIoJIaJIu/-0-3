(function (window, undefined) {

function FakeAuth ($http) {
    this._$http = $http;
    return this;
}

/**
 *  "id": "54da325b5489203743520c98",
 *  "firstName": "test2",
 *  "lastName": "heroku2",
 *  "email": "test2@test.com",
 *  "userRoles": [{
 *    "businessId": "54c1b1a39d64e6006666aaab",
 *    "role": "BUSINESS_ADMIN"
 *  }]
 */
FakeAuth.prototype.loginAsFounder = function ($http) {
    this._$http.defaults.headers.common.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmF0aW9uIjoxNDU2MTIyMzIzMTk2fQ.948W5m78G1XrtZN4Etsk0Bger2safzRRU9UrNVTli8w';
    this.myId = "54da325b5489203743520c98"
}

FakeAuth.prototype.logout = function () {
    this._$http.default.header.common.Authorization = null;
    this.myId = null; 
}

window.FakeAuth = FakeAuth;

})(window);
