var frmlndGrass = function($window, $interval) {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, element, attrs) {

			// Observe the element's dimensions.
			var dimensions = {
				w: element[0].offsetParent.clientWidth,
				h: element[0].offsetParent.clientHeight
			};

			// Create grass blades and add them to the DOM
			var blades = [];
			for (var i=1; i<dimensions.w; i++) {
				blades[i] = angular.element('<div class="blade" style="left: ' + i + 'px"></div>');
				element.append(blades[i]);
			}

			// Make the grass grow
			var count = 0;
			var intervalLength = 17;
			scope.growGrass = $interval(function() {
				if (count * intervalLength > attrs.duration) {
					$interval.cancel(scope.growGrass);
				}

				var repeat = attrs.duration / intervalLength;
				for (var i=0; i<repeat; i++) {
					var blade_index = Math.floor(Math.random() * (dimensions.w - 1) + 1);
					if (blade_index) {
						var grow_distance = Math.floor(Math.random() * (10 - 1) + 1);
						var rotate = (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
						var current_height = blades[blade_index][0].offsetHeight;
						blades[blade_index].css('height', current_height + grow_distance + 'px');
						blades[blade_index].css('transform', 'rotate(' + rotate + 'deg)');
					}
				}
				count += intervalLength;

			}, intervalLength);

			scope.$on('$destroy', function() {
				$interval.cancel(scope.growGrass);
			});			

		}
	}
};

frmlndGrass.$inject = ['$window','$interval'];
angular.module('frmlnd-grass').directive('frmlndGrass', frmlndGrass);