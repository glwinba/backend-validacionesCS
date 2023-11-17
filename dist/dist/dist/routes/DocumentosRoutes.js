"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentosRoutes = void 0;
var _express = require("express");
var _DocumentosController = require("../controllers/DocumentosController.js");
var router = (0, _express.Router)();
router.get('/Archivos/XML', _DocumentosController.XMLController);
router.get('/Archivos/PDF', _DocumentosController.PDFController);
var DocumentosRoutes = exports.DocumentosRoutes = router;