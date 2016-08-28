/**
 * an entity name does not start with - or /
 * @function validateEntityName
 */
export default function validateEntityName(options = {}) {
	
	let { errorMessage = 'Invalid entity name' } = options;

  	return (key, newValue, oldValue, changes) => {
    	
    	let dot = newValue.indexOf('-') === 0,
    	slash = newValue.indexOf('/') === 0;
    	if (dot || slash) {
    		return errorMessage;
    	} else {
    		return true;
    	}
  	
  	};
}
