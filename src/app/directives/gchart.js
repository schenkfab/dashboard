angular.module('myApp').directive('gchart', function() {
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			width: '@width',
			height: '@height',
			data: '=data',
			chart: '@chart',
			json: '@json'
		},
		link: function ($scope, $elm) {
			
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Label');
			data.addColumn('number', 'Value');
			var chart = new google.visualization.PieChart($elm[0]);

			google.charts.setOnLoadCallback(draw);
			
			function draw() {
				if($scope.json) {
					var data = new google.visualization.DataTable($scope.data);
				} else {
					var data = google.visualization.arrayToDataTable($scope.data);
				}

				var options = {};

				var geomap = undefined;

				if($scope.chart == 'GeoMap') {
					options = {
						'dataMode': 'regions'
					};
					geomap = new google.visualization.GeoMap($elm[0]);
				} else if($scope.chart == 'Table') {
					options = {
					};
					geomap = new google.visualization.Table($elm[0]);
				} else if($scope.chart == 'BarChart') {
					options = {
						'width': '100%',
						'chartArea': {
							left: '20%',
							top: '10%',
							height: '70%',
							width: '80%'
						}
					};
					geomap = new google.visualization.BarChart($elm[0]);
				} else if($scope.chart == 'LineChart') {
					options = {
						'curveType': 'function',
						'width': '100%',
						'chartArea': {
							left: '10%',
							top: '10%',
							height: '70%',
							width: '90%'
						}
					};
					geomap = new google.visualization.LineChart($elm[0]);
				} else {
					options = {
						'width': '100%',
						'chartArea': {
							left: '10%',
							top: '10%',
							height: '70%',
							width: '90%'
						}
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