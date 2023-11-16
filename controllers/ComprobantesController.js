import { response, request } from "express";
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const urlBase = process.env.BASE_URL_CS;

//funcion donde obtenemos los comprobantes y reemplazamos las url del alojamiento
export const ComprobantesControler = async (req= request, res = response)=>{
    const headersAuthorization = req.headers['authorization'] || false;
    if(headersAuthorization){ //comprobamos que exista un parámetro de autorización
        const [ ,token ] = headersAuthorization.split(' ');
        const urlParams = req.url;
        try {
            const response = await getComprobantesRequestCS(token, urlParams);

            if(response.status !== 200) throw Error('Petición fallada con estatus 401');
            
            const { data } = response;
                    
            data.comprobantes = filtradoComprobantes(data); //filtamos y reemplazamos
            data.comprobantePagina = data.comprobantes.length;
            
            res.status(200).json({data});
        } catch (error) {
            res.status(404).json({ msg:error.message });
        }
    }else{
        res.status(404).json({ msg:'Token no encontrado' });
    }
}

//request de comprobantes
const   getComprobantesRequestCS = async (token, url)=>{
    try {
        return await axios.get(`${urlBase}${url}`,{
            headers:{
                'Authorization':`Bearer ${token}` 
            }
        });
    } catch (error) {
        return {error: error.message, status:401};
    }
}

//remplazamos el los urls del alojamiento
const remplazarAlojamiento = (comprobante)=>{
    const urlBase = 'https://csvalidacion.s3.us-east-2.amazonaws.com';
    const nuevoURL = 'https://glwinba.s3.us-east-2.amazonaws.com';

    const { alojamiento } = comprobante;
    const { urL_XML, urL_PDF,urL_PDF_ACUSE} = alojamiento;

    return  {
        path_XML: urL_XML ? urL_XML.replace(urlBase,nuevoURL) : null,
        path_PDF: urL_PDF ? urL_PDF.replace(urlBase,nuevoURL) : null,
        path_PDF_ACUSE: urL_PDF_ACUSE ? urL_PDF_ACUSE.replace(urlBase,nuevoURL) : null,
    }
}

const filtradoComprobantes = (data=[])=>{
    return data.comprobantes.filter(comprobante=>{
        comprobante.alojamiento = remplazarAlojamiento(comprobante);
        return comprobante;
    });
}