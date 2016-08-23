import { isEmail } from 'sam-ai-ui/utils/input-validators';
import { module, test } from 'qunit';

module('Unit | Utility | input validators');
/**
 * 1. email must have an "AT" and "DOT" characters
 */
test('it validates email addresses', assert => {
	assert.expect(2);
	let correctEmail = 'info@abc.xyz',
		wrongEmail = 'info-abc-xyz';
	let result = isEmail(correctEmail);
	assert.ok(result, 'The format for this email is correct');
	result = isEmail(wrongEmail);
	assert.ok(result, 'The format for this email is wrong');
});
