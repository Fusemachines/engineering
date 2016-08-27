import DS from 'ember-data';

const host = 'http://localhost:3000/connected-entities/search';
export default DS.JSONAPIAdapter.extend({
	host,
	pathForType(type) { return (type === 'entity')? '': type; }
});
