import React, { Component } from "react";

import Selection from "../selection/SelectionContainer";
import Map from "../../components/maps/Maps";
import Loader from "../../components/loader/Loader";

import "./app.css";

/**
 * @type {Component}
 * @name APP
 * @description Main container.
 */
class App extends Component {
  state = {
    path: [],
    isLoading: false
  };

  /**
   * @name updateMap
   * @description This method to update path to draw polyline between source and destination
   * @param {{path}} Array of latitude and logtitude.
   */

  updateMap = path => {
    this.setState({ path: path });
  };

  /**
   * @name resetMap
   * @description This method to reset path to remove polyline from map.
   */
  resetMap = () => {
    this.setState({ path: [] });
  };

  /**
   * @name changeLoader
   * @description This method to reset loader.
   */
  changeLoader = isLoading => {
    this.setState({ isLoading });
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="content">
            <Loader isLoading={this.state.isLoading} />
            <div className="row">
              <div className="col-xs-12 col-md-3 col-sm-12 col-lg-3">
                <Selection
                  updatePath={this.updateMap}
                  resetMap={this.resetMap}
                  changeLoader={this.changeLoader}
                />
              </div>
              <div className="col-xs-12 col-md-9 col-sm-12 col-lg-9">
                <Map path={this.state.path} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
