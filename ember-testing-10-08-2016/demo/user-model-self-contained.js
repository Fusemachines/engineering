import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

import config from 'sam-ai-ui/config/environment';

const { computed } = Ember;
const { whiteList } = config;

let UserModel = DS.Model.extend({
	name: attr('string', { defaultValue: 'No Name' }),
	username: attr('string'),
	messages: attr('string')
});
UserModel.reopen({
	// create an email if username is not email address
	email: computed('username', {
		get() {
			let username = this.get('username');
			email = this.isEmail(username)? username : this.createEmail(username);
			return email;
		},
		set(key, value) {
			return value;
		}
	}),
	// create email only if username is on whiteList
	createEmail(username) {
		let shouldCreate = whiteList.usernames.find(n => n === username);
		return shouldCreate? `${username}@${whiteList.domain}` : whiteList.defaultValue;
	}
	isEmail(input) { 
		return !!input && input.split('@').length > 1 && input.split('\.').length > 1;
	}
});

export default UserModel;
