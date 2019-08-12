import React, { Component } from "react";
import PropTypes from "prop-types";

import FormControl from "../form/FormControl";
import getDirections from "../../service/serviceRequest";
import { TIME_LABEL, DISTANCE_LABEL, API_CONSTANTS } from "../../constant";

import "./leftPanel.css";

/**
 * @type {Component}
 * @name Selection
 * @description View to show input and button to manipulate map.
 */

class Selection extends Component {
  // Initial State
  state = {
    errorMsg: "",
    time: "",
    distance: ""
  };

  /**
   * @name resetMapHandler
   * @description This method is used to reset the application
   *  state to original one.
   */
  resetMapHandler = () => {
    const { resetMapPath } = this.props;
    this.setState({
      time: "",
      distance: "",
      errorMsg: ""
    });
    resetMapPath();
  };

  /**
   * @name displayErrorMessage
   * @description This method display the error message and hide loader.
   * @param {{message}} String Message to be displayed
   */

  displayErrorMessage = message => {
    this.setState({ errorMsg: message, time: "", distance: "" });
  };

  /**
   * @name normalizedMapPathLocation
   * @description This method reconstruct path receive from api calls.
   * @param {{path}} Array
   * @returns Modified path array
   */
  normalizedMapPathLocation = path =>
    path.map(coord => ({
      lat: parseFloat(coord[0]),
      lng: parseFloat(coord[1])
    }));

  /**
   * @name getDirectionAndUpdateMap
   * @description This method is calling api to get path , total
   * distance and total time and same updated in the state to refresh map.
   * In case of any error it will same update in state.
   * @param {{from}} String Passing origin
   * @param {{to}} String  Passing destination
   */
  getDirectionAndUpdateMap = async (from, to) => {
    const { changeLoaderState, updateMapPath } = this.props;
    if (from && to) {
      changeLoaderState(true);
      this.setState({
        errorMsg: "",
        time: "",
        distance: ""
      });
      await getDirections(from, to, API_CONSTANTS.retryLimit)
        .then(response => {
          const { error, path } = response;
          if (path) {
            let path = this.normalizedLocation(response.path);
            this.setState({
              time: response.total_time,
              distance: response.total_distance,
              errorMsg: ""
            });

            updateMapPath(path);
          } else {
            updateMapPath([]);
            this.displayErrorMessage(error || API_CONSTANTS.apiErrorMessage);
            return;
          }
        })
        .catch(e => {
          updateMapPath([]);
          this.displayErrorMessage(API_CONSTANTS.apiErrorMessage);
        });
      changeLoaderState(false);
    }
  };

  /**
   * @description Render method of the component
   */
  render() {
    const { distance, time, errorMsg } = this.state;
    const { google } = this.props;
    return (
      <>
        <div className="row mt-1">
          <div className="col-xs-12 col-12 col-md-12 col-sm-12 col-lg-12">
            <FormControl
              getDirections={this.getDirectionAndUpdateMap}
              resetMap={this.resetMapHandler}
              google={google}
            />
          </div>
        </div>
        <div className="row mt-3 mb-1">
          <div
            className="col-12 col-xs-12 col-sm-12 col-md-12 
                        col-lg-12 col-md-offset-1 col-sm-offset-1 col-xs-offset-1"
          >
            {distance && (
              <div>
                {DISTANCE_LABEL} : {distance}
              </div>
            )}
            {time && (
              <div>
                {TIME_LABEL} : {time}
              </div>
            )}
            <span className="text-danger">{errorMsg}</span>
          </div>
        </div>
      </>
    );
  }
}

Selection.propTypes = {
  resetMapPath: PropTypes.func.isRequired,
  updateMapPath: PropTypes.func.isRequired,
  changeLoaderState: PropTypes.func.isRequired,
  google: PropTypes.object
};
export default Selection;