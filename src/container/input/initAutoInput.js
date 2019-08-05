import { GoogleApiWrapper } from 'google-maps-react';
import InputControl from './InputControl';

/**
  * @description provide google api props to manipulate map to wrapped component
 */

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(InputControl)
