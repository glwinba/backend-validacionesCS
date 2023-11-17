"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComprobantesRoutes = void 0;
var _express = require("express");
var _ComprobantesController = require("../controllers/ComprobantesController.js");
var router = (0, _express.Router)();
router.get('/Comprobantes', _ComprobantesController.ComprobantesControler);
var ComprobantesRoutes = exports.ComprobantesRoutes = router;