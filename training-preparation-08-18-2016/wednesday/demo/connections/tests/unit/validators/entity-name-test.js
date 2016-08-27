import { module, test } from 'qunit';
import validateEntityName from 'connections/validators/entity-name';

module('Unit | Validator | entity-name');

test('it exists', function(assert) {
  assert.ok(validateEntityName());
});
