import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'section',
	classNames: ['row', 'entity-manager-ui'],
	actions: {
		sendSeachValue(value) {
			let changeset = this.get('entityChangeset');
			this.sendAction('search-action', changeset);
		}
	}
});
