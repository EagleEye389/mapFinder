import { GoogleApiWrapper} from 'google-maps-react';
import InputControl from '../input/inputControl'

export default GoogleApiWrapper({apiKey:process.env.REACT_APP_API_KEY})(InputControl)