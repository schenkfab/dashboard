angular.module('myApp').controller('mainCtrl', function(pageService, $scope, $interval) {
	pageService.setCurrentPage('employee');

	$scope.random = 0;


	/*$interval(function() {
		$scope.random = Math.random();
	}.bind(this), 500);*/

	$scope.getPage = function() {
		return pageService.getCurrentPage();
	};

	$scope.setPage = function(page) {
		pageService.setCurrentPage(page);
	};
});

angular.module('myApp').controller('customerCtrl', function(pageService, $scope, $http) {
	$scope.visible = function() {
		return pageService.getCurrentPage() == 'metrics';
	};

	// a line chart reflecting number of paying customers over a period of time
	$scope.customers = {};
	$scope.customers.chartType = 'LineChart';
	$http.get('/assets/mock/customers.json').success(function(json) {
		$scope.customers.data = json;
	});

	/*$interval(function(){
		$http.get('/assets/mock/customers.json').success(function(json) {
			$scope.customers.data = json;
			console.log('data refreshed');
		});
	}.bind(this), 1000); */
});

angular.module('myApp').controller('employeeCtrl', function($scope, pageService, $http) {

	$scope.visible = function() {
		return pageService.getCurrentPage() == 'employee';
	};

	$scope.employee = {};
	$http.get('/assets/mock/employee.json').success(function(data) {
		$scope.employee.data = data;
	});
	$scope.employee.chartType = 'GeoMap';
});

angular.module('myApp').controller('dataCtrl', function($scope, pageService, $http) {
	$scope.visible = function() {
		return pageService.getCurrentPage() == 'data';
	};
	$scope.issue = {};
	$scope.issue.data = [];
	
	$scope.issue.chartType = 'Table';

	function getData(cb) {
		$http.get('/assets/mock/issues.csv').success(function(allText) {
			// split content based on new line
			var allTextLines = allText.split(/\r\n|\n/);
			var headers = allTextLines[0].split(',');
			var lines = [];

			for ( var i = 0; i < allTextLines.length; i++) {
				// split content based on comma
				var data = allTextLines[i].split(',');
				if (data.length == headers.length) {
					var tarr = [];
					for ( var j = 0; j < headers.length; j++) {
						tarr.push(data[j]);
					}
					lines.push(tarr);
				}
			}
			lines.forEach(function(l) {
				if (l[0] != 'id') {
					l[0] = parseInt(l[0]);
					l[1] = new Date(l[1]);
					l[2] = new Date(l[2]);
					if (l[6] == 'Open') {
						l[2] = null;
					}
				}
			});
			$scope.filters = {};
			$scope.issue.header = lines[0];
			$scope.issue.values = {};
			// get values for all headers:
			$scope.issue.header.forEach(function(value, index) {
				$scope.issue.values[value] = [];
				lines.forEach(function(l) {
					if (l[0] != 'id') {
						if(value == 'created' || value == 'closed') {
							if ($scope.issue.values[value].map(Number).indexOf(+l[index]) == -1) {
								$scope.issue.values[value].push(l[index]);
							} 
						} else {
							if ($scope.issue.values[value].indexOf(l[index]) == -1) {
								$scope.issue.values[value].push(l[index]);
							} 
						}
					}
				});
			});
			cb(lines);
		});

	}


	$scope.applyFilter = function() {
		$scope.filteredData = [];
		var i = $scope.issue.data.length;
		while (i--) {
			if ($scope.issue.data[i][0] != 'id') {
				$scope.issue.header.forEach(function(head, index) {
					if ($scope.filters[head]) {
						if ($scope.issue.data[i][index] != $scope.filters[head]) {
							$scope.issue.data.splice(i, 1);
						}
					}
				});
			}
		}	
	};

	$scope.reloadData = function() {
		getData(function(data) {
			$scope.issue.data = data;
		});
	};

	getData(function(data) {
		$scope.issue.data = data;
	});
});

angular.module('myApp').controller('issueCtrl', function($scope, $http, pageService) {
	
	$scope.visible = function() {
		return pageService.getCurrentPage() == 'metrics';
	};
	$scope.issueLine = {};
	$scope.issueLine.data = [];
	$scope.issueLine.chartType = 'BarChart';

	$http.get('/assets/mock/issues.json').success(function(data) {
		$scope.issueLine.data = data;
	});

	// Open Issue
	$http.get('/assets/mock/openissues.json').success(function(data) {
		$scope.issueCount = {};
		$scope.issueCount.open = data.open;
	});

});