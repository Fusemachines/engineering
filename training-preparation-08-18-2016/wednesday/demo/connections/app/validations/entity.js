// validations/entity.js
import {
	validatePresence 
} from 'ember-changeset-validations/validators';

import validateEntityName from '../validators/entity-name';
export default {
  text: [
  	validatePresence(true),
  	validateEntityName({ errorMessage: 'Please provide a valid name' })
  ]
};