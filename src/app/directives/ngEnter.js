/**
    Full credits to: https://gist.github.com/EpokK/5884263
*/

angular.module('myApp').directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind('keydown keypress', function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});