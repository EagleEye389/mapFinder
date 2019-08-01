import React,{Component} from 'react';
import Selection from '../selection/selectionContainer';
import Map from '../map/mapContainer';
import './app.css';

class App extends Component{
     
  state = {
      path:[]
  }
   
    /**
     * @name updateMap
     * @description This method to update path to draw polyline between source and destination
     * @param path Array of latitude and logtitude.
     */

  updateMap=(path)=>{
    this.setState({path:path});
  }

    /**
     * @name resetMap
     * @description This method to reset path to remove polyline from map.     
     */
  resetMap =()=>{
     this.setState({path:[]})
  }
  render(){

    return (
      <div className="app">    
       <div className="content"> 
          <Selection updatePath={this.updateMap} resetMap={this.resetMap}/>
          <Map path={this.state.path}/>
        </div>
      </div>     
    )
}
}

export default App;
