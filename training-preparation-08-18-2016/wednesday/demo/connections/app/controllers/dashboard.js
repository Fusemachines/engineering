import Ember from 'ember';
import EntityValidation from '../validations/entity';

export default Ember.Controller.extend({
	EntityValidation,
	queryParams: ['q'],
	q: undefined,
	inputHolder: null,
	init() {
		this._super(...arguments);
		this.set('inputHolder', Ember.Object.create({
			text: undefined
		}));
	}
});
