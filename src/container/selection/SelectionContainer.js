import React, { Component } from "react";
import PropTypes from "prop-types";

import InputControl from "../input/InitAutoInput";
import getDirections from "../../api/apiRequest";
import { TIME_LABEL, DISTANCE_LABEL, API_CONSTANTS } from "../../constant";

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
    this.setState({
      time: "",
      distance: "",
      errorMsg: ""
    });
    this.props.resetMap();
  };

  /**
   * @name displayErrorMessage
   * @description This method display the error message and hide loader.
   * @param {{message}} String Message to be displayed
   */

  displayErrorMessage = message => {
    this.props.changeLoader(false);
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
    if (from && to) {
      this.props.changeLoader(true);
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

            this.props.updatePath(path);
          } else {
            this.displayErrorMessage(error || API_CONSTANTS.apiError);
            return;
          }
        })
        .catch(e => {
          this.displayErrorMessage(API_CONSTANTS.apiError);
        });
      this.props.changeLoader(false);
    }
  };

  /**
   * @description Render method of the component
   */
  render() {
    return (
      <>
        <div className="row mt-1">
          <div className="col-xs-12 col-12 col-md-12 col-sm-12 col-lg-12">
            <InputControl
              getDirections={this.handleSubmission}
              resetMap={this.handleResetHandler}
            />
          </div>
        </div>
        <div className="row mt-3 mb-1">
          <div
            className="col-12 col-xs-12 col-sm-12 col-md-12 
                        col-lg-12 col-md-offset-1 col-sm-offset-1 col-xs-offset-1"
          >
            {this.state.distance && (
              <div>
                {DISTANCE_LABEL} : {this.state.distance}
              </div>
            )}
            {this.state.time && (
              <div>
                {TIME_LABEL} : {this.state.time}
              </div>
            )}
            <span className="text-danger">{this.state.errorMsg}</span>
          </div>
        </div>
      </>
    );
  }
}

Selection.propTypes = {
  resetMap: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  changeLoader: PropTypes.func.isRequired
};
export default Selection;
