import Axiosinstance from '../axios/axiosSetup';
import {API_CONSTANTS} from './config/'

const getToken = async(url, request)=>{
     const response =   await Axiosinstance.post(url,request);
     const {data} = response;
     return data.token;
}

const getPath = async (token)=>{
    let pathUrl  = `${API_CONSTANTS.route}/${token}`;
    const response = await Axiosinstance.get(pathUrl);
    const {data} = response;
    return data;
}

const getDirections = async(from,to)=>{
       const url =  API_CONSTANTS.route;
       const request = {
           "origin":from,
           "destination":to
       }
    const token  = await getToken(url,request);
    let result  =  await getPath(token)

    if(result && result.data && result.data.status.toLowerCase() === "in progress")
    {
        getDirections(from,to);
    }
    return result;    
    
}

export default getDirections;