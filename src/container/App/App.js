import React,{Component} from 'react';

import Selection from '../selection/SelectionContainer';
import Map from '../map/MapContainer';

import './app.css';

/**
 * @type {Component}
 * @name APP
 * @description Main container.
 */
class App extends Component{

  state = {
      path:[]
  }
   
    /**
     * @name updateMap
     * @description This method to update path to draw polyline between source and destination
     * @param {{path}} Array of latitude and logtitude.
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
        <div className="container"> 
        <div className="content">
        <div className="row">
          <div className="col-xs-12 col-md-4 col-sm-12 col-lg-4">
          <Selection updatePath={this.updateMap} resetMap={this.resetMap}/>
          </div>
          <div className="col-xs-12 col-md-8 col-sm-12 col-lg-8">
          <Map path={this.state.path}/>
          </div>
          </div>
          </div>
        </div>
      </div>     
    )
}
}

export default App;
