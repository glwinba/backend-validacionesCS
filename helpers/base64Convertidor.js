
export const base64ToString = (data)=>{    
    const response = Buffer.from(data,'base64').toString().split(':');
    return response;
}