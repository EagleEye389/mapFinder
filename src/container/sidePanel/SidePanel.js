import React, { Component } from "react";
import PropTypes from "prop-types";

import FormControl from "../form/FormControl";
import getDirections from "../../service/serviceRequest";
import { TIME_LABEL, DISTANCE_LABEL, API_CONSTANTS } from "../../constant";

import "./sidePanel.css";

/**
 * @name SidePanel
 * @type {Component}
 * @description View to show input and button to manipulate map.
 */

class SidePanel extends Component {
  // Initial State
  state = {
    errorMsg: "",
    time: "",
    distance: ""
  };

  /**
   * @name resetMap
   * @description This method is used to reset the application
   *  state to original one.
   */
  resetMap = () => {
    const { resetMapPath } = this.props;
    this.setState(
      {
        time: "",
        distance: "",
        errorMsg: ""
      },
      resetMapPath
    );
  };

  /**
   * @name displayErrorMessage
   * @description This method display the error message and hide loader.
   * @param {{message}} String Message to be displayed
   */

  displayErrorMessage = message => {
    const { updateMapPath } = this.props;
    this.setState({ errorMsg: message, time: "", distance: "" }, () =>
      updateMapPath([])
    );
  };

  /**
   * @name convertPathToLatAndLng
   * @description This method reconstruct path receive from api calls.
   * @param {{path}} Array
   * @returns Modified path array
   */
  convertPathToLatAndLng = path =>
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
    const { toggleLoader, updateMapPath } = this.props;
    if (from && to) {
      toggleLoader(true);
      this.setState({
        errorMsg: "",
        time: "",
        distance: ""
      });
      await getDirections(from, to, API_CONSTANTS.retryLimit)
        .then(response => {
          let { error, path, total_distance, total_time } = response;
          if (path) {
            path = this.convertPathToLatAndLng(response.path);
            this.setState(
              {
                time: total_time,
                distance: total_distance,
                errorMsg: ""
              },
              () => updateMapPath(path)
            );
          }
          if (error) {
            this.displayErrorMessage(error || API_CONSTANTS.apiErrorMessage);
          }
        })
        .catch(e => {
          this.displayErrorMessage(API_CONSTANTS.apiErrorMessage);
        });
      toggleLoader(false);
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
        <div className="row">
          <div className="col-xs-12">
            <FormControl
              getDirections={this.getDirectionAndUpdateMap}
              resetMap={this.resetMap}
              google={google}
            />
          </div>
        </div>
        <div className="row info-box">
          <div className="col-xs-12 col-xs-offset-1">
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
            {errorMsg && <span className="text-danger">{errorMsg}</span>}
          </div>
        </div>
      </>
    );
  }
}

SidePanel.propTypes = {
  resetMapPath: PropTypes.func.isRequired,
  updateMapPath: PropTypes.func.isRequired,
  toggleLoader: PropTypes.func.isRequired,
  google: PropTypes.object
};
export default SidePanel;
