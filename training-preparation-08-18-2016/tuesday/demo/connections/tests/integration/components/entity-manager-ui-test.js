import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('entity-manager-ui', 'Integration | Component | entity manager ui', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{entity-manager-ui}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#entity-manager-ui}}
      template block text
    {{/entity-manager-ui}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
