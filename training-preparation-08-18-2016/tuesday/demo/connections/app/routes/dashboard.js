import Ember from 'ember';

const {
	A, Logger, Route
} = Ember;

export default Route.extend({
	queryParams: {
    	q: {
      		refreshModel: true
     	}
  	},
	model(params) {
		return (params.q)? this.store.query('entity', params) : A([]);
	},
	setupController(controller, model) {
		this._super(...arguments);
		Logger.log('setup-controller', model, model.get('firstObject'));
		controller.set('entity', model.get('firstObject'));
		Logger.log('setup-controller', model.get('firstObject'));
	},
	actions: {
		searchEntities(text, source) {
			// we validate input if the source is the form owner
			// @TODO
			this.controller.set('q', text);
			// this.refresh();
		}
	}
});
