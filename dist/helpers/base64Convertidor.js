"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64ToString = void 0;
var base64ToString = exports.base64ToString = function base64ToString(data) {
  var response = Buffer.from(data, 'base64').toString().split(':');
  return response;
};