import React, { Component } from "react";
import PropTypes from "prop-types";

import InputControl from "../input/InputControl";
import getDirections from "../../api/apiRequest";
import { TIME_LABEL, DISTANCE_LABEL, API_CONSTANTS } from "../../constant";

import "./selectionContainer.css";

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
   * @name handleResetHandler
   * @description This method is used to reset the application
   *  state to original one.
   */
  handleResetHandler = () => {
    const { resetMap } = this.props;
    this.setState({
      time: "",
      distance: "",
      errorMsg: ""
    });
    resetMap();
  };

  /**
   * @name displayErrorMessage
   * @description This method display the error message and hide loader.
   * @param {{message}} String Message to be displayed
   */

  displayErrorMessage = message => {
    const { changeLoader } = this.props;
    changeLoader(false);
    this.setState({ errorMsg: message, time: "", distance: "" });
  };

  /**
   * @name normalizedLocation
   * @description This method reconstruct path receive from api calls.
   * @param {{path}} Array
   * @returns Modified path array
   */
  normalizedLocation = path =>
    path.map(coord => ({
      lat: parseFloat(coord[0]),
      lng: parseFloat(coord[1])
    }));

  /**
   * @name handleSubmission
   * @description This method is calling api to get path , total
   * distance and total time and same updated in the state to refresh map.
   * In case of any error it will same update in state.
   * @param {{from}} String Passing origin
   * @param {{to}} String  Passing destination
   */
  handleSubmission = async (from, to) => {
    const { changeLoader, updatePath } = this.props;
    if (from && to) {
      changeLoader(true);
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

            updatePath(path);
          } else {
            this.displayErrorMessage(error || API_CONSTANTS.apiError);
            return;
          }
        })
        .catch(e => {
          this.displayErrorMessage(API_CONSTANTS.apiError);
        });
      changeLoader(false);
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
            <InputControl
              getDirections={this.handleSubmission}
              resetMap={this.handleResetHandler}
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
  resetMap: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  changeLoader: PropTypes.func.isRequired,
  google: PropTypes.object
};
export default Selection;
