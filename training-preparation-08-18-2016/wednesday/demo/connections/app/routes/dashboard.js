import Ember from 'ember';

const {
	A, Logger, get, Route
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
		debugger;
		Logger.log('setup-controller', model, model.get('firstObject'));
		controller.set('entity', model.get('firstObject'));
		Logger.log('setup-controller', model.get('firstObject'));
	},
	actions: {
		searchEntities(text, source) {
			Logger.log('searchEntities', text, source);
			// we validate input if the source is the form owner
			// @TODO
			this.controller.set('q', text);
			// this.refresh();
		},
		customSearchEntities(changeset, source) {
			changeset
			.validate()
			.then(() => {
				if (get(changeset, 'isValid')) {
					changeset.execute(); // change value of entity.text
					let value = changeset.get('text');
					Logger.log('setup-controller', value);
					this.send('searchEntities', value, this);
				}
			}).catch((error) => {
				Logger.log('setup-controller', error);
				return changeset;
			});
		}
	}
});