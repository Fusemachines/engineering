import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('connection-list-manager-ui', 'Integration | Component | connection list manager ui', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{connection-list-manager-ui}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#connection-list-manager-ui}}
      template block text
    {{/connection-list-manager-ui}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
