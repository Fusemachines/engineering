/**
 * email must have an "AT" and "DOT" characters
 * @param input { String }
 * @namespace inputValidators.isEmail
 * @module sam-ai-ui
 */
export function isEmail(input) {
	return !!input && input.split('@').length > 1 && input.split('\.').length > 1;
}