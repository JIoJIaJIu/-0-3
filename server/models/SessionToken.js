'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SessionTokenSchema = new Schema({
  userId: String,
  token: String,
  expirationDate: { type: Date, default: Date.now }
});

/**
 * Module exports
 */
module.exports = SessionTokenSchema
