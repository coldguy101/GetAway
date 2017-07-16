import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import test from '../imports/components/test/test';

var app = angular.module('getaway', [
    angularMeteor,
    todosList.name,
    test.name
]);

app.controller('mainController', function ($scope) {
    $scope.go = function (path) {
	$location.url(path);
    };

    console.log('city: ', $scope.city);

    console.log('getting activities')
    Meteor.call('getActivities', function (error, result) {
	if (error) {
	    console.log(error);
	    return;
	}
	console.log('Activities:');
	console.log(result);
	$scope.things = result.activities;
	$scope.$apply();
    });

    console.log('getting homes')
    Meteor.call('getHomes', function (error, result) {
	if (error) {
	    console.log(error);
	    return;
	}
	console.log('Homes:');
	console.log(result);
	$scope.properties = result;
	$scope.$apply();
    });
});

console.log(todosList)
