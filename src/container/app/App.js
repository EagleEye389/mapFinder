import React, { Component } from "react";
import PropTypes from "prop-types";
import { GoogleApiWrapper } from "google-maps-react";

import SidePanel from "../sidePanel/SidePanel";
import Map from "../../components/maps/Maps";
import Loader from "../../components/loader/Loader";
import { AppLoader } from "../../components/loader/Loader";

import "./app.css";

/**
 * @name APP
 * @type {Component}
 * @description Main container.
 */
class App extends Component {
  state = {
    path: [],
    isLoading: false
  };

  /**
   * @name updateMapPath
   * @description This method to update path to draw polyline between source and destination
   * @param {{path}} Array of latitude and logtitude.
   */

  updateMapPath = path => {
    this.setState({ path: path });
  };

  /**
   * @name resetMapPath
   * @description This method to reset path to remove polyline from map.
   */
  resetMapPath = () => {
    this.setState({ path: [] });
  };

  /**
   * @name toggleLoader
   * @description This method to reset loader.
   */
  toggleLoader = isLoading => {
    this.setState({ isLoading });
  };

  render() {
    const { path, isLoading } = this.state;
    const { google } = this.props;
    return (
      <div className="app">
        <div className="container">
          <div className="content-box">
            <Loader isLoading={isLoading} />
            <div className="row">
              <div className="col-xs-12 col-md-3">
                <SidePanel
                  updateMapPath={this.updateMapPath}
                  resetMapPath={this.resetMapPath}
                  toggleLoader={this.toggleLoader}
                  google={google}
                />
              </div>
              <div className="col-xs-12 col-md-9">
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
