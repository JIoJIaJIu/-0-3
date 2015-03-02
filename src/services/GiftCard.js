angular.module('MomAndPop.services').service('GiftCard', [
    '$http',
    '$log',
    'utils',
    'CONFIG',
function ($http, $log, utils, CONFIG) {
    /**
     * @param {Object} criteria
     * @param {Function} callback
     */
    this.search = function () {
    }

    /**
     * @param {String} id
     * @param {Function} callback
     */
    this.get = function (id, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'users/me/giftCards', id);

        $log.debug('Requesting [GET]', URL);
        $http.get(URL)
            .success(function (card) {
                callback(null, card)
            })
            .error(function (resp) {
                callback(resp && resp.error);
            });
    }

    /**
     * @param {String} id
     * @param {Number} quantity
     * @param {String} desc
     * @param {Function} callback
     */
    this.resell = function (id, quantity, desc, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'users/me/giftCards', id, 'resell');

        $log.debug('Requesting [POST]', URL);
        $http.post(URL, {
            quantityToSell: quantity,
            description: desc
        }).success(function (card) {
                callback(null, card)
            })
            .error(function (resp) {
                callback(resp && resp.error);
            });
    }

    /**
     * @param {String} id
     * @param {Number} amount
     * @param {Function} callback
     */
    this.prepareForRedeem = function (id, amount, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'users/me/giftCards', id, 'prepareForRedeem');

        $log.debug('Requesting [POST]', URL);
        $http.post(URL, {
            amount: amount
        }).success(function (card) {
                callback(null, card)
            })
            .error(function (resp) {
                callback(resp && resp.error);
            });
    }

    /**
     * @param {String} qrCode
     * @param {Number} amount
     * @param {Function} callback
     */
    this.redeem = function (qrCode, amount, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCards/redeem');

        $log.debug('Requesting [POST]', URL);
        $http.post(URL, {
            qrCode: qrCode,
            amount: amount
        }).success(function (card) {
                callback(null, card)
            })
            .error(function (resp) {
                callback(resp && resp.error);
            });
    }

    /**
     * @param {Function} callback
     */
    this.getTotalRedeemedAmount = function () {
    }
}]);
