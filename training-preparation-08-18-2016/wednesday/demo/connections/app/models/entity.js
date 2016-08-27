import DS from 'ember-data';
import Ember from 'ember';

const {
	computed, Logger
} = Ember;

let Entity = DS.Model.extend({
  text: DS.attr('string'),
  properties: DS.attr(), // array of objects
  connections: DS.hasMany('connection') // array of strings
});

/**
 * all instance of this class will have firstConnection as their property
 */
Entity.reopen({
	firstConnection: computed('connections', {
		get() {
			let connections = this.get('connections');
			Logger.debug('check for first connection', connections, connections.get('firstObject'));
			return connections.get('firstObject');
		}
	})
});

export default Entity;