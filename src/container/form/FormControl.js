import React, { Component } from "react";
import PropTypes from "prop-types";

import ClearButton from "../../components/clearButton/ClearButton";
import ButtonControl from "../../components/button/Button";

import {
  START_LABEL,
  START_PLACEHOLDER,
  DROP_LABEL,
  DROP_PLACEHOLDER
} from "../../constant";

import "./formControl.css";

/**
 * @name FormControl
 * @type {Component}
 * @description This component provide autocomplete input and button to manage the map.
 */
class FormControl extends Component {
  // starting point input reference is saved here.
  fromInput;

  // drop off input reference is saved here.
  toInput;

  // starting point is saved when google autocomplete query is done.
  fromAutoComplete;

  // drop off point is saved when google autocomplete query is done.
  toAutoComplete;

  // Initial State
  state = {
    from: false,
    to: false,
    submitLabel: "Submit"
  };

  /**
   * @name renderInputAutoComplete
   * @description Attach the google places autocomplete to the inputs
   */
  renderInputAutoComplete = () => {
    const {
      google: { maps }
    } = this.props;
    if (maps) {
      this.fromAutoComplete = new maps.places.Autocomplete(this.fromInput);
      this.toAutoComplete = new maps.places.Autocomplete(this.toInput);
    }
  };

  componentDidMount() {
    this.renderInputAutoComplete();
  }

  /**
   * @name handleCrossButtonAction
   * @description It will clear corresonding input box and if both input box
   * is cleard then it will reset map also.
   * @param {{inputbox }} String an string to detect cross button instance
   */
  handleCrossButtonAction = inputbox => {
    // If from(start point) cross button is clicked then clear the value and state.
    if (inputbox === "from") {
      this.fromInput.value = "";
      this.setState({ from: false }, () => {
        if (!this.toInput.value) {
          this.handleResetMap();
        }
      });
    }
    // If to(drop-off point) cross button is clicked then clear the value and state.
    else if (inputbox === "to") {
      this.toInput.value = "";
      this.setState({ to: false }, () => {
        if (!this.fromInput.value) {
          this.handleResetMap();
        }
      });
    }
  };

  /**
   * @name handleResetMap
   * @description It will clear the autocomplete input box and reset the map.
   */

  handleResetMap = () => {
    this.toInput.value = "";
    this.fromInput.value = "";
    const { resetMap } = this.props;
    this.setState(
      {
        to: false,
        from: false,
        submitLabel: "Submit"
      },
      () => {
        resetMap();
      }
    );
  };

  /**
   * @name handleCrossButtonVisibilty
   * @description It will control the visibility of cross button besides the input box.
   * @param {{box}} String  to detect whose cross button is clicked.
   */
  handleCrossButtonVisibilty = box => {
    /* If  start point input box has value then show the cross button else hide the
      cross button.*/
    if (box === "from" && this.fromInput.value) {
      this.setState({ [box]: true });
    } else if (box === "to" && this.toInput.value) {
      this.setState({ [box]: true });
    } else {
      this.setState({ [box]: false });
    }
  };

  /**
   * @name getRoute
   * @description Call api to fetch the direction if both starting and drop off point
   * is mentioned or has value else it will red outline the corresponding input for missing
   * value
   */
  getRoute = () => {
    const { getDirections } = this.props;
    if (this.fromInput.value && this.toInput.value) {
      const from = this.fromAutoComplete.getPlace();
      const to = this.toAutoComplete.getPlace();
      this.setState({ submitLabel: "Re-Submit" });
      getDirections(from, to);
    }
  };

  render() {
    const { from, to, submitLabel } = this.state;
    return (
      <>
        <div className="form-area">
          <div className="row">
            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <span>
                <label>{START_LABEL}</label>
              </span>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-10 col-xs-10 col-md-10 col-sm-10 col-lg-10">
              <div className="form-group">
                <input
                  type="text"
                  placeholder={START_PLACEHOLDER}
                  onChange={() => {
                    this.handleCrossButtonVisibilty("from");
                  }}
                  className="form-control"
                  ref={e1 => (this.fromInput = e1)}
                />
              </div>
            </div>
            <div className="col-2 col-xs-2 col-md-2 col-sm-2 col-lg-2 mt-1 placement">
              <ClearButton
                name="source"
                onChangeInput={() => {
                  this.handleCrossButtonAction("from");
                }}
                value={from}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <span>
                <label>{DROP_LABEL}</label>
              </span>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-10 col-xs-10 col-md-10 col-sm-10 col-lg-10 ">
              <div className="form-group">
                <input
                  type="text"
                  placeholder={DROP_PLACEHOLDER}
                  className="form-control"
                  onChange={() => this.handleCrossButtonVisibilty("to")}
                  ref={e1 => (this.toInput = e1)}
                />
              </div>
            </div>
            <div className="col-2 col-xs-2 col-md-2 col-sm-2 col-lg-2 mt-1 placement">
              <ClearButton
                label="X"
                name="destination"
                onChangeInput={() => this.handleCrossButtonAction("to")}
                value={to}
              />
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div
            className="col-5 col-sm-5 col-xs-5 col-md-5
                         col-md-offset-1 col-sm-offset-1 col-xs-offset-1 col-lg-offset-1"
          >
            <ButtonControl
              label={submitLabel}
              type="btn btn-primary"
              disableCheck={!(from && to)}
              handleClick={this.getRoute}
            />
          </div>
          <div className="col-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <ButtonControl
              label="Reset"
              type="btn btn-secondary"
              disableCheck={!(from || to)}
              handleClick={this.handleResetMap}
            />
          </div>
        </div>
      </>
    );
  }
}

// Props need to pass to render this control.
FormControl.propTypes = {
  google: PropTypes.object.isRequired,
  resetMap: PropTypes.func.isRequired,
  getDirections: PropTypes.func.isRequired
};

export default FormControl;
