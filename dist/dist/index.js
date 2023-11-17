"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _multer = _interopRequireDefault(require("multer"));
var _index = require("./routes/index.js");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
//configuración de multar
var storage = _multer["default"].memoryStorage();
_dotenv["default"].config();
var app = (0, _express["default"])();
var PORT = process.env.PORT_BASE || 5500;
var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'text/xml' || file.mimetype === 'application/xml') {
    cb(null, true);
  } else {
    cb(new Error('Este tipo de archivo no está permitido'), false);
  }
};
var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter
});
app.use((0, _morgan["default"])('dev'));
app.use('/v1', _index.LoginRoutes);
app.use('/v1', _index.ComprobantesRoutes);
app.use('/v1', _index.DocumentosRoutes);
app.use('/v1', upload.single('archivoXML'), _index.ValidarXML);

// Manejo global de errores
app.use(function (err, req, res, next) {
  if (err.message === 'Este tipo de archivo no está permitido') {
    // Error de Multer
    return res.status(400).json({
      error: 'Error en el formato de carga de archivos.'
    });
  } else if (err) {
    // Otro tipo de error
    console.error(err);
    return res.status(500).json({
      error: 'Error interno del servidor.'
    });
  }

  // Si no hay errores, pasa al siguiente middleware
  next();
});
app.listen(PORT, function () {
  console.log("El proceso est\xE1 corriendo en el puerto ".concat(PORT));
});