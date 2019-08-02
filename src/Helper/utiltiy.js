/**
 * @name normalizedLocation
 * @description This method reconstruct path receive from api calls.
 * @param {{path}} Array 
 * @returns Modified path array
 */
export const normalizedLocation=(path)=>{
    return path.map((coord)=>{
          return { lat:parseFloat(coord[0]),lng:parseFloat(coord[1])}
     })
     
 }

 