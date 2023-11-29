import dotenv from 'dotenv';
import  express from 'express';
import logger from 'morgan';
import multer from 'multer';

import { ComprobantesRoutes, DocumentosRoutes, LoginRoutes, ValidarXML } 
from './routes/index.js';

//configuración de multar
const storage = multer.memoryStorage();

dotenv.config();

const app = express();
const PORT = process.env.PORT_BASE || 3000;

const fileFilter = (req, file, cb)=>{
    if(file.mimetype ==='text/xml' || file.mimetype ==='application/xml'){
        cb(null,true)
    }else{
        cb(new Error('Este tipo de archivo no está permitido'),false)
    }
}

const upload = multer({ storage, fileFilter });
app.use(logger('dev')); 

app.use('/v1',(req, res)=>{
    res.status(200).json({ msg: 'Servicio de validación de cfdi\'s' })
})
app.use('/v1',LoginRoutes);
app.use('/v1',ComprobantesRoutes);
app.use('/v1',DocumentosRoutes);
app.use('/v1',upload.single('archivoXML'),ValidarXML);

// Manejo global de errores
app.use((err, req, res, next) => {
    
    if (err.message === 'Este tipo de archivo no está permitido') {
      // Error de Multer
      return res.status(400).json({ error: 'Error en el formato de carga de archivos.' });
    } else if (err) {
      // Otro tipo de error
      console.error(err);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }

    // Si no hay errores, pasa al siguiente middleware
    next();
});

app.listen(PORT,()=>{
    console.log(`El proceso está corriendo en el puerto ${ PORT }`)
});