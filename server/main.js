import { Meteor } from 'meteor/meteor';
const homeaway = require('./homeaway.js');
const expedia = require('./expedia.js');

Meteor.startup(() => {
    Meteor.methods({
	getCurrentTime: function () {
	    console.log('on server, getCurrentTime called');
	    return new Date();
	},

	getActivities: function(func) {
	    console.log('getting activities');
	    var promise = new Promise((resolve, reject) => {
		get_activities('Austin', 'Texas',
			       '2017-7-10', '2017-7-13', resolve);
	    })
	    return promise.await();
	},

	getHomes: function(func) {
	    console.log('getting homes');
	    var promise = new Promise((resolve, reject) => {
		get_homes('Austin', 'Texas', '2017-7-10', '2017-7-13',
			  null, null, null, resolve);
	    })
	    return promise.await();
	}
    });
});
