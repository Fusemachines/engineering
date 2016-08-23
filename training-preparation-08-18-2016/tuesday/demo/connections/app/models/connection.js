import DS from 'ember-data';

export default DS.Model.extend({
  path: DS.attr('string'),
  entities: DS.attr(), // array of string
  connections: DS.belongsTo('connection') // array of strings
});
