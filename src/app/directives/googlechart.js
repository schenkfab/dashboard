angular.module('myApp').directive('gchart', function() {
	return {
		restrict: 'EA',
		scope: {
			title: '@title',
			width: '@width',
			height: '@height',
			data: '=data',
			chart: '@chart',
			selectFn: '&select'
		},
		link: function ($scope, $elm, $attr) {
			
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Label');
			data.addColumn('number', 'Value');
			var chart = new google.visualization.PieChart($elm[0]);

			google.charts.setOnLoadCallback(draw);
			
			function draw() {
				var data = google.visualization.arrayToDataTable($scope.data);

				var options = {
					'title': $scope.title,
					'width': $scope.width,
					'height': $scope.height,
					'dataMode': 'regions'
				};

				options['dataMode'] = 'regions';

				var geomap = undefined;

				if($scope.chart == 'GeoMap') {
					geomap = new google.visualization.GeoMap($elm[0]);
				} else if($scope.chart == 'Table') {
					geomap = new google.visualization.Table($elm[0]);
				} else {
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