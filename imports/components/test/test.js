import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './test.html';
import { Meteor } from 'meteor/meteor';

class Test {
  constructor() {
    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];
  }

  submit() {
    console.log("trying")
    Meteor.call('getActivities', function(err, response) {
  			if(err) {
  				console.log("Error:" + err.reason);
  				return;
  			}
  			//Session.set('serverDataResponse', response);
        console.log(response);
  		});
  }
}

export default angular.module('test', [
  angularMeteor
]).component('test', {
    templateUrl: 'imports/components/test/test.html',
    controller: Test
  });
