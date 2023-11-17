"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _LoginController = require("../controllers/LoginController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post('/Cuenta/Login', _LoginController.LoginController);
var LoginRoutes = exports.LoginRoutes = router;