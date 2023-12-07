// Import the createIconSetFromIcoMoon function from the 'react-native-vector-icons' library
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

// Import the IcoMoon configuration from the 'selection.json' file located at the relative path '../../selection.json'
import icoMoonConfig from '../../selection.json';

// Create a custom icon set using the imported createIconSetFromIcoMoon function and the IcoMoon configuration
// The resulting custom icon set is then exported as the default export of this module
export default createIconSetFromIcoMoon(icoMoonConfig);
