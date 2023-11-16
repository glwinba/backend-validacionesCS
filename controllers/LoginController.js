import { response } from 'express';

export const LoginController = async (req,res = response )=>{
    const authHeader = req.headers['authorization'];

    if(authHeader){
        const auth = authHeader.split(' ');
        const credenciales = base64ToString(auth[1]);
        const [ usuario, password ] = credenciales;
        const response = await fetch('https://api.csvalidacion.mx/v2/Cuenta/Login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Basic ${btoa(`${usuario}:${password}`)}`
            }
        });
        const responseJSON = await  response.json();
        res.status(200).json(responseJSON);
    }
}

const base64ToString = (data) => Buffer.from(data,'base64').toString().split(':');