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
		if (this.get('stopFetching')) {
			this.set('stopFetching', false);
			return A();
		}
		return (params.q)? this.store.query('entity', params) : A();
	},
	setupController(controller, model) {
		this._super(...arguments);
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
			
			this.set('changeset', changeset);

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
		},
		error(error, transition, route) {
			Logger.log('transition error', error.errors[0].title, transition, route);
			let changeset = this.get('changeset');
			if (changeset) {
				let message = error.errors[0].title;
				changeset.addError('text', [message]);
			}

			this.set('stopFetching', true);
			return transition.retry();
		}
	}
});
