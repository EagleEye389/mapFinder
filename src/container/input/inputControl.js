import React, { Component } from "react";
import PropTypes from "prop-types";

import CrossButton from "../../components/CrossButton/crossButton";
import ButtonControl from "../../components/button/button";

import {
  START_LABEL,
  START_PLACEHOLDER,
  DROP_LABEL,
  DROP_PLACEHOLDER
} from "../../helper/constant";

import "./inputControl.css";

/**
 * @name InputControl
 * @type {Component}
 * @description This component provide autocomplete input and button to manage the map.
 */
class InputControl extends Component {
  // starting point input reference is saved here.
  fromInput;

  // drop off input reference is saved here.
  toInput;

  // starting point is saved when google autocomplete query is done.
  fromAutoComplete;

  // drop off point is saved when google autocomplete query is done.
  toAutoComplete;

  state = {
    from: false,
    to: false,
    submitLabel: "Submit"
  };

  // Initial State

  /**
   * @name renderInputAutoComplete
   * @description Attach the google places autocomplete to the inputs
   */
  renderInputAutoComplete = async () => {
    const maps = await this.props.google.maps;
    this.fromAutoComplete = new maps.places.Autocomplete(this.fromInput);
    this.toAutoComplete = new maps.places.Autocomplete(this.toInput);
  };

  componentDidMount() {
    this.renderInputAutoComplete();
  }

  /**
   * @name clearInputAutoPlacer
   * @description It will clear the autocomplete input box and reset the map.
   * @param {{inputbox }} String an optional string to detect box or map reset click
   */
  clearInputAutoPlacer = inputbox => {
    // If startpoint cross button is clicked then clear the value and state.
    if (inputbox === "from") {
      this.fromInput.value = "";
      this.setState({ from: false });
    }
    // If drop off cross button is clicked then clear the value and state.
    else if (inputbox === "to") {
      this.toInput.value = "";
      this.setState({ to: false });
    }
    // If reset is clicked then clear the value and state and reset map.
    else {
      this.toInput.value = "";
      this.fromInput.value = "";
      this.setState({
        to: false,
        from: false,
        submitLabel: "Submit"
      });
      this.props.resetMap();
    }
  };

  /**
   * @name handleCrossButton
   * @description It will control the visibility of cross button besides the input box.
   * @param {{box}} String  to detect whose cross button is clicked.
   */
  handleCrossButton = box => {
    /* If  start point input box has value then show the cross button else hide the
      cross button.*/

    if (box === "from") {
      if (this.fromInput.value) {
        this.setState({ from: true });
      } else {
        this.setState({ from: false });
      }
    }

    /* If  drop off point input box has value then show the cross button else hide the
       cross button. */
    if (box === "to") {
      if (this.toInput.value) {
        this.setState({ to: true });
      } else {
        this.setState({ to: false });
      }
    }
  };

  /**
   * @name getRoute
   * @description Call api to fetch the direction if both starting and drop off point
   * is mentioned or has value else it will red outline the corresponding input for missing
   * value
   */
  getRoute = () => {
    if (this.fromInput.value && this.toInput.value) {
      const from = this.fromAutoComplete.getPlace();
      const to = this.toAutoComplete.getPlace();
      this.setState({ submitLabel: "Re-Submit" });
      this.props.getDirections(from, to);
    }
  };

  render() {
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
                    this.handleCrossButton("from");
                  }}
                  className={this.state.emptyErrorFrom + " form-control"}
                  ref={e1 => (this.fromInput = e1)}
                />
              </div>
            </div>
            <div className="col-2 col-xs-2 col-md-2 col-sm-2 col-lg-2 mt-1 placement">
              <CrossButton
                name="source"
                onChangeInput={() => {
                  this.clearInputAutoPlacer("from");
                }}
                value={this.state.from}
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
                  className={this.state.emptyErrorTo + " form-control"}
                  onChange={() => this.handleCrossButton("to")}
                  ref={e1 => (this.toInput = e1)}
                />
              </div>
            </div>
            <div className="col-2 col-xs-2 col-md-2 col-sm-2 col-lg-2 mt-1 placement">
              <CrossButton
                label="X"
                name="destination"
                onChangeInput={() => this.clearInputAutoPlacer("to")}
                value={this.state.to}
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
              label={this.state.submitLabel}
              type="btn btn-primary"
              disableCheck={!(this.state.from && this.state.to)}
              handleClick={this.getRoute}
            />
          </div>
          <div className="col-5 col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <ButtonControl
              label="Reset"
              type="btn btn-secondary"
              disableCheck={!(this.state.from || this.state.to)}
              handleClick={this.clearInputAutoPlacer}
            />
          </div>
        </div>
      </>
    );
  }
}

// Props need to pass to render this control.
InputControl.propTypes = {
  google: PropTypes.object.isRequired,
  resetMap: PropTypes.func.isRequired,
  getDirections: PropTypes.func.isRequired
};

export default InputControl;
