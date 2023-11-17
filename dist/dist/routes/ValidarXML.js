"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidarXML = void 0;
var _express = require("express");
var _ValidacionXMLController = require("../controllers/ValidacionXMLController.js");
var router = (0, _express.Router)();
router.post('/Validaciones/XML', _ValidacionXMLController.ValidarXMLController);
var ValidarXML = exports.ValidarXML = router;