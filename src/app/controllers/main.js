angular.module('myApp').controller('mainCtrl', function($scope) {
	$scope.employee = {};
	$scope.employee.data = [['Country', 'Nr. of empoyees'],
					['Germany', 486],
					['United States', 2134],
					['Brazil', 84],
					['Canada', 124],
					['France', 15]];

	$scope.employee.width = 500;
	//$scope.employee.height = 500;
	$scope.employee.title = 'Employee by Region';
	$scope.employee.chartType = 'GeoMap';
});