import { response, request } from "express";
import dotenv from 'dotenv';
dotenv.config();

const urlBase = process.env.BASE_URL_CS;

//funcion donde obtenemos los comprobantes y reemplazamos las url del alojamiento
export const ComprobantesControler = async (req= request, res = response)=>{
    const headersAuthorization = req.headers['authorization'];
    const [ ,token ] = headersAuthorization.split(' ');
    const urlParams = req.url;
    
    try {
        const data = await getComprobantes(token, urlParams);
        if(!data) throw Error('Response not found');

        const comprobantes = data.comprobantes.filter(comprobante=>{
            comprobante.alojamiento = remplazarAlojamiento(comprobante);
            return comprobante;
        });
    
        data.comprobantes = comprobantes;
        data.comprobantePagina = comprobantes.length;
        console.log(typeof data);
        res.status(200).json({data});
    } catch (error) {
        res.status(404).json({ msg:error.message });
    }
}

//request de comprobantes
const getComprobantes = async (token, url)=>{
    if(token){
        try {
            const response = await fetch(`${urlBase}${url}`,{
                headers:{
                    'Authorization':`Bearer ${token}` 
                }
            });
            return await response.json();
        } catch (error) {
            return false;
        }
    }else{
        res.status(401).json({ msg:'Token not found' })
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