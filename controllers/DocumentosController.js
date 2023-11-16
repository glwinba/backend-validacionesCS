import axios from 'axios';
import { request, response } from 'express'
import { writeFile } from 'fs';
import { pipeline } from 'stream/promises'; // Utilizamos la versión promisificada

const urlBase = process.env.BASE_URL_CS


export const XMLController = async (req = request, res = response) => {
    const { keyNameAWS } = req.query;
    const headersAuthorization = req.headers['authorization'] || false;
    if (headersAuthorization) {
        const [, token] = headersAuthorization.split(' ');
        if (keyNameAWS) {
            try {
                const response = await getXMLRequestCS(keyNameAWS, token);
                if (response.status === 200) {
                    const { data } = response;
                    res.writeHead(200, { 'Content-Type': 'application/xml' });
                    res.end(data);
                } else {
                    res.status(401).json({ msg: 'Peticion no autorizada' });
                }
            } catch (error) {
                res.status(200).json({ msg: 'Error en la peticion con estatus 404' });
            }
        } else {
            res.status(404).json({ msg: 'No se encontro ninguna ruta de busqueda' });
        }
    } else {
        res.status(404).json({ msg: 'Token no encontrado' });
    }
}


export const PDFController = async (req = request, res = response) => {
    const authorizationBearer = req.headers['authorization'];
    const { keyNameAWS } = req.query;

    if (authorizationBearer) {
        const [, token] = authorizationBearer.split(' ');
        if (keyNameAWS) {
            try {
                const response = await getPDFRequestCS(keyNameAWS, token);
                writeFile('./uploads/archivo.pdf',response,{ flag:'w' }, (err)=>{});
                res.setHeader('Content-Type', 'application/pdf');
                res.send(response);
            } catch (error) {
                res.status(404).json({ msg: 'Error en la petición con estatus 404' });
            }
        } else {
            res.status(404).json({ msg: 'No se encontraron parámetros de búsqueda' });
        }
    } else {
        res.status(401).json({ msg: 'Token no encontrado' });
    }
}

/* Funciones request para la obtención de los ficheros  */

//funcion http para obtener los xlm solicitados por parámetros
const getXMLRequestCS = async (keyNameAWS = '', token) => {
    const url = `${urlBase}/Archivos/XML?keyNameAWS=${keyNameAWS}`;
    return axios.get(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

const getPDFRequestCS = async (keyNameAWS = '', token) => {
    const url = `${urlBase}/Archivos/PDF?keyNameAWS=${keyNameAWS}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'arraybuffer'
        });
        return response.data;
    } catch (error) {
        throw new Error('Error en la solicitud Axios');
    }
};