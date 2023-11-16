import  { request, response } from 'express'
import { pipeline } from 'stream/promises'; // Utilizamos la versión promisificada

const urlBase = process.env.BASE_URL_CS


export const XMLController = async (req = request, res= response )=>{
    const { keyNameAWS } = req.query;
    if(req.headers['authorization'] &&  keyNameAWS){
        const [ ,token ] = req.headers['authorization'].split(' ');
        try {
            const data = await getXML(keyNameAWS, token);
            if(data.status === 200){
                const response = await data.text();
                res.writeHead(200,{'Content-Type':'application/xml'});
                res.end(response);
            }else{
                res.status(401).json({msg:'Unauthorized'});
            }
        } catch (error) {
            res.status(200).json({ msg:error.message });
        }

    }else{
        res.status(404).json({ msg: 'There is a problem with the request'});
    }

}

export const PDFController = async (req = request, res= response )=>{
    const authorizationBearer = req.headers['authorization'];
    const { keyNameAWS } = req.query;

    if(authorizationBearer && keyNameAWS ){
        const [ ,token ] = authorizationBearer.split(' ');
        try {
            const data = await getPDF(keyNameAWS, token);
            res.setHeader('Content-Type','application/pdf');
            await pipeline(data.body, res);
        } catch (error) {
            res.status(404).json({ msg:error.message });
        }

    }else{
        res.status(401).json({ msg: 'There is a problem with the request' });
    }
}


/* Funciones request para la obtención de los ficheros  */

//funcion http para obtener los xlm solicitados por parámetros
const getXML = async (keyNameAWS,token)=>{
    const url = `${urlBase}Archivos/XML?keyNameAWS=${keyNameAWS}`;
    return await fetch(url,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
}

const getPDF = async (keyNameAWS,token)=>{
    const url = `${urlBase}Archivos/PDF?keyNameAWS=${keyNameAWS}`;
    return await fetch(url,{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
}
