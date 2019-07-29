const normalizedLocation=(path)=>{
    let newPath =  path.map((coord)=>{
          return { lat:parseFloat(coord[0]),lng:parseFloat(coord[1])}
     })
     return newPath;
 }

 export default normalizedLocation;