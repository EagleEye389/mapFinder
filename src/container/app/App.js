import React, { Component } from "react";
import PropTypes from "prop-types";
import { GoogleApiWrapper } from "google-maps-react";

import Selection from "../selection/SelectionContainer";
import Map from "../../components/maps/Maps";
import Loader from "../../components/loader/Loader";
import { AppLoader } from "../../components/loader/Loader";

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
    const { path, isLoading } = this.state;
    const { google } = this.props;
    return (
      <div className="app">
        <div className="container">
          <div className="content">
            <Loader isLoading={isLoading} />
            <div className="row">
              <div className="col-xs-12 col-md-3 col-sm-12 col-lg-3">
                <Selection
                  updatePath={this.updateMap}
                  resetMap={this.resetMap}
                  changeLoader={this.changeLoader}
                  google={google}
                />
              </div>
              <div className="col-xs-12 col-md-9 col-sm-12 col-lg-9">
                <Map path={path} google={google} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  google: PropTypes.object
};
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
  LoadingContainer: AppLoader
})(App);
