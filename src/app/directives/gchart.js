angular.module('myApp').directive('gchart', function() {
	return {
		restrict: 'EA',
		scope: {
			width: '@width',
			height: '@height',
			data: '=data',
			chart: '@chart'
		},
		link: function ($scope, $elm) {
			
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Label');
			data.addColumn('number', 'Value');
			var chart = new google.visualization.PieChart($elm[0]);

			google.charts.setOnLoadCallback(draw);
			
			function draw() {
				var data = google.visualization.arrayToDataTable($scope.data);

				var options = {};

				var geomap = undefined;

				if($scope.chart == 'GeoMap') {
					options = {
						'width': $scope.width,
						'height': $scope.height,
						'dataMode': 'regions'
					};
					geomap = new google.visualization.GeoMap($elm[0]);
				} else if($scope.chart == 'Table') {
					options = {
						'width': $scope.width,
						'height': $scope.height
					};
					geomap = new google.visualization.Table($elm[0]);
				} else if($scope.chart == 'BarChart') {
					options = {
						'width': $scope.width,
						'height': $scope.height
					};
					geomap = new google.visualization.BarChart($elm[0]);
				} else if($scope.chart == 'LineChart') {
					options = {
						'width': $scope.width,
						'curveType': 'function',
						'height': $scope.height
					};
					geomap = new google.visualization.LineChart($elm[0]);
				} else {
					options = {
						'width': $scope.width
					};
					geomap = new google.visualization.PieChart($elm[0]);
				}
				geomap.draw(data, options);		
			}

			$scope.$watch('data', function () {
				draw();
			}, true); // true is for deep object equality checking
			$scope.$watch('title', function () {
				draw();
			});
			$scope.$watch('width', function () {
				draw();
			});
			$scope.$watch('height', function () {
				draw();
			});
			$scope.$watch('chart', function () {
				draw();
			});
		}
	};
});