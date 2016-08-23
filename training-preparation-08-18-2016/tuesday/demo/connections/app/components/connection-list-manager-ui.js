import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'section',
	classNames: ['row', 'connection-list-manager-ui'],
	actions: {
		searchEntity(text) {
			this.sendAction('search-again-action', text, this);
		}
	}
});
