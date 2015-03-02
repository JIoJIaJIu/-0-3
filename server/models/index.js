/*
 * Copyright (C) 2015 TopCoder Inc., All Rights Reserved.
 */
/**
 * Init and export all schemas.
 *
 * @version 1.0
 * @author TCSASSEMBLER
 */
"use strict";


var mongoose = require('mongoose'),
    config = require('config');

var db = mongoose.createConnection(config.MONGODB_URL, {
    server: {
        poolSize: config.MONGODB_CONNECTION_POOL_SIZE
    }
});

module.exports = {
    ActionType: db.model('ActionType', require('./ActionType')),
    ActionRecord: db.model('ActionRecord', require('./ActionRecord')),
    Business: db.model('Business', require('./Business')),
    BusinessType: db.model('BusinessType', require('./BusinessType')),
    GiftCard: db.model('GiftCard', require('./GiftCard')),
    GiftCardOffer: db.model('GiftCardOffer', require('./GiftCardOffer')),
    GiftCardOfferComment: db.model('GiftCardOfferComment', require('./GiftCardOfferComment')),
    GiftCardRedeem: db.model('GiftCardRedeem', require('./GiftCardRedeem')),
    OfferCategory: db.model('OfferCategory', require('./OfferCategory')),
    SessionToken: db.model('SessionToken', require('./SessionToken')),
    User: db.model('User', require('./User'))
};
