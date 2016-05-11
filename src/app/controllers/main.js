angular.module('myApp').controller('mainCtrl', function() {

});

angular.module('myApp').controller('employeeCtrl', function($scope) {
	$scope.employee = {};
	$scope.employee.data = [['Country', 'Nr. of empoyees'],
					['Germany', 486],
					['United States', 2134],
					['Brazil', 84],
					['Canada', 124],
					['France', 15]];

	$scope.employee.width = 800;
	$scope.employee.height = 500;
	$scope.employee.chartType = 'GeoMap';
});

angular.module('myApp').controller('issueCtrl', function($scope, $http) {

	$scope.issue = {};
	$scope.issue.data = [];
	
	$scope.issue.width = '100%';
	$scope.issue.height = 300;
	$scope.issue.chartType = 'Table';

	$scope.issueLine = {};
	$scope.issueLine.data = [];
	
	$scope.issueLine.width = 1200;
	$scope.issueLine.height = 500;
	$scope.issueLine.chartType = 'BarChart';

	$scope.issueLine.data = [['Month', 'Open Issues', 'Closed Issues', 'Rejected Issues'],
					['2016/01', 486, 428, 12],
					['2016/02', 634, 502, 29],
					['2016/03', 184, 288, 5],
					['2016/04', 124, 180, 18],
					['2016/05', 150, 50, 3]];

	function getData(cb) {
		$http.get('http://localhost:3000/assets/mock/issues.csv').success(function(allText) {
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
		var originalData = $scope.issue.data;
		$scope.filteredData = [];
		var i = originalData.length;
		while (i--) {
			if (originalData[i][0] != 'id') {
				$scope.issue.header.forEach(function(head, index) {
					if ($scope.filters[head]) {
						if (originalData[i][index] != $scope.filters[head]) {
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