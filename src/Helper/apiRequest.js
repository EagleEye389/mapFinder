import Axiosinstance from './axios/AxiosSetup';
import {API_CONSTANTS} from './constant'


/**
 * @name fetchRoute
 * @description This method fetch the route from the server based on token
 * @param url
 * @param request Object containing source and destination
 * @returns token
 */
export const getToken = async(url, request)=>{
     const response =   await Axiosinstance.post(url,request);
     const {data} = response;
     return data.token;
}

/**
 * @name getPath
 * @description fetch the token from the server based on the starting and drop-off point
 * @param token
 * @return Route Info
 */

export const getPath = async (token)=>{
    let pathUrl  = `${API_CONSTANTS.route}/${token}`;
    const response = await Axiosinstance.get(pathUrl);
    const {data} = response;
    return data;
}

/**
 * @name getDirections
 * @description Fetch the directions based on the starting and drop-off point
 * This method first fetch the token and after based on token fetch the routing info
 * @param from Starting Point
 * @param to Drop-off Point
 * @param retryLimit  Retry limit in case status is in progress
 */
export const getDirections = async(origin,destination,retryLimit)=>{
    if(retryLimit<1){
        return {
            error:"Server is busy, Kindly try after some time."
        }
    }
       const url =  API_CONSTANTS.route;
       const request = {
            origin,
            destination
       }
    const token  = await getToken(url,request);
    let result  =  await getPath(token);
    if(result && result.status.toLowerCase() === API_CONSTANTS.inProgress)
    {
        result = await getDirections(origin,destination,retryLimit-1);
    }
    
    return result;    
    
}

export default getDirections;