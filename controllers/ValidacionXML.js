import { request, response } from "express"
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const urlBase = process.env.BASE_URL_CS;

export const ValidarXMLController = async (req = request, res = response)=>{
    const documento = req.file;
    if(!documento) res.status(404).json({ msg: 'No se encontró documento' });
    const headerAuthorization = req.headers['authorization'] || false;
    
    if(headerAuthorization){
        const [ ,token ] = req.headers['authorization'].split(' ');
        try {
            const response = await getValidacion(documento, token);
            const { data } = await response;
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }else{
        res.status(404).json({ msg:'Token not found' });
    }
}

const getValidacion = async (file, token)=>{

    const formData = new FormData();
    const blob = new Blob([Buffer.from(file.buffer)], { type: file.mimetype }); 
    formData.append('archivoXML',blob, file.originalname);
    const url = `${urlBase}Validaciones/XML`;
    const response = await axios.post(url,formData,{
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type":"multipart/form-data; boundary=---011000010111000001101001"
        },
    });
    return response;
}

