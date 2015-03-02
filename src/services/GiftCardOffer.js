angular.module('MomAndPop.services').service('GiftCardOffer', [
    '$http',
    '$log',
    'CONFIG',
    'utils',
function ($http, $log, CONFIG, utils) {
    /** 
     * Creating offer
     *
     * @param {Object} offer
     * @param {Function} callback
     *   @param {String} err
     *   @param {String} offer
     */
    this.create = function (offer, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers');

        $log.debug('Requesting [POST]', URL);
        $http.post(URL, offer)
            .success(function (offer) {
                callback(null, offer);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            });
    }

    /**
     * @param {Object} [criteria]
     *   @key {Number} pageSize
     *   @key {Number} pageNumber
     *   @key {String} [sortBy]
     *   @key {String} [sortOrder]
     *   @key {String} [businessName]
     *   @key {String} [businessType]
     *   @key {String} [businessAddress]
     *   @key {Array} [discountRange], array of numbers
     *   @key {Array} [dateRange], array of datetimes
     *   @key {String} [description]
     *   @key {Array} [statuses], array of strings
     *   @key {Array} [availableQuantityRange], array of numbers
     *   @key {Array} [coordinates], array of numbers
     * @param {Function} callback
     *   @param {String} err
     *   @param {Object} resp
     *      @key {Number} totalPages
     *      @key {Number} pageNumber
     *      @key {Number} totalRecords
     *      @key {Array} items
     */
    this.search = function (criteria, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers');

        $log.debug('Requesting [GET]', URL);
        $http.get(URL, {params: criteria})
            .success(function (resp) {
                callback(null, resp);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            })
    }

    /**
     * Getting offer by id
     *
     * @param {String} id
     * @param {Function} callback
     *   @param {Error} err
     *   @param {Object} offer
     */
    this.get = function (id, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers', id);

        $log.debug('Requesting [GET]', URL);
        $http.get(URL)
            .success(function (offer) {
                callback(null, offer);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            })
    }

    /**
     * TODO: not described in REST_API_Specification.docx
     * @param {Array} ids
     * @param {Function} callback
     *   @param {Error} err
     *   @param {Array} offers, array of offer
     */
    this.getGiftCardOffers = function (ids, callback) {
      //  var URL = utils.pathJoin.apply(utils, [CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers'].concat(ids));
        var URL = utils.pathJoin.apply(utils, [CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers', 'ids'].concat([ids[0]]));

        $log.debug('Requesting [GET]', URL);
        $http.get(URL)
            .success(function (offers) {
                callback(null, offers);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            })
    }

    /**
     * @param {String} id
     * @param {Function} callback
     *   @param {Error} err
     */
    this.delete = function (id, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers', id);

        $log.debug('Requesting [DELETE]', URL);
        $http.delete(URL)
            .success(function () {
                callback(null);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            })
    }

    /**
     * @param {Object} offer
     * @param {Function} callback
     *   @param {String} err
     */
    this.update = function (offer, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers', offer.id);

        $log.debug('Requesting [PUT]', URL);
        $http.put(URL, offer)
            .success(function () {
                callback(null);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            })
    }

    /**
     * @param {String} id
     * @param {Function} callback
     *   @param {String} err
     */
    this.cancel = function (id, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers', id, 'cancel');

        $log.debug('Requesting [POST]', URL);
        $http.post(URL)
            .success(function () {
                callback(null);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            })
    }

    /**
     * @param {String} id
     * @param {Function} callback
     *   @param {String} err
     *   @param {Array} users
     */
    this.getOwners = function (id, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers', id, 'owners');

        $log.debug('Requesting [GET]', URL);
        $http.get(URL)
            .success(function (users) {
                callback(null, users);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            })
    }

    /**
     * @param {Object} card
     * @param {Function} callback
     */
    this.purchase = function (card, callback) {
    }

    /**
     * @param {String} offerId
     * @param {Object} comment
     * @param {Function} callback
     */
    this.addComment = function (offerId, comment, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers', offerId, 'comments');

        $log.debug('Requesting [POST]', URL);
        $http.post(URL, comment)
            .success(function (comment) {
                callback(null, comment);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            });
    }

    /**
     * @param {String} offerId
     * @param {String} commentId
     * @param {Function} callback
     */
    this.removeComment = function (offerId, commentId, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers', offerId, 'comments', commentId);

        $log.debug('Requesting [DELETE]', URL);
        $http.delete(URL)
            .success(function (comment) {
                callback(null, comment);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            });
    }

    /**
     * @param {String} offerId
     * @param {Function} callback
     *   @param {String} err
     *   @param {Array} comments
     */
    this.getComments = function (offerId, callback) {
        var URL = utils.pathJoin(CONFIG.REST_SERVICE_BASE_URL, 'giftCardOffers', offerId, 'comments');

        $log.debug('Requesting [GET]', URL);
        $http.get(URL)
            .success(function (resp) {
                callback(null, resp);
            })
            .error(function (resp) {
                callback(resp && resp.error);
            })
    }
}]);
