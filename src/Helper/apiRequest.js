import Axiosinstance from '../axios/AxiosSetup';
import {API_CONSTANTS} from './constant'

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

const getDirections = async(origin,destination)=>{
       const url =  API_CONSTANTS.route;
       const request = {
            origin,
            destination
       }
    const token  = await getToken(url,request);
    let result  =  await getPath(token)

    if(result && result.data && result.data.status.toLowerCase() === API_CONSTANTS.inProgress)
    {
        getDirections(origin,destination);
    }
    return result;    
    
}

export default getDirections;