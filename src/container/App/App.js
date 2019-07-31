import React,{Component} from 'react';
import './app.css';
import Selection from '../Selection/Selectioncontainer';
import Map from '../Map/MapContainer';

class App extends Component{
     
  constructor(props){
    super(props);
    this.state = {
      path:[]
    }
  }

  updateMap=(path)=>{
    this.setState({path:path});
  }

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
