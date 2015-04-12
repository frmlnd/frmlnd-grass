var frmlndGrass = function($window, $interval) {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, element, attrs) {

			// Get window dimensions
			var dimensions = {
				w: $window.innerWidth,
				h: $window.innerHeight
			};

			// Create grass blades and add them to the DOM
			var blades = [];
			for (var i = 1; i < dimensions.w; i++) {
				blades[i] = angular.element('<div class="blade" style="left: ' + i + 'px"></div>');
				element.append(blades[i]);
			}

			// Make the grass grow
			var count = 0;
			var interval = $interval(function() {
				if (count > attrs.duration) {
					$interval.cancel(interval);
				}
				var blade_index = Math.floor(Math.random() * (dimensions.w - 1) + 1);
				if (blade_index) {
					var grow_distance = Math.floor(Math.random() * (10 - 1) + 1);
					var rotate = (Math.floor(Math.random() * 20) + 1) * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
					var current_height = blades[blade_index][0].offsetHeight;
					blades[blade_index].css('height', current_height + grow_distance + 'px');
					blades[blade_index].css('transform', 'rotate(' + rotate + 'deg)');
					count++;
				}

			}, 1);

		}
	}
};

frmlndGrass.$inject = ['$window','$interval'];
angular.module('frmlnd-grass').directive('frmlndGrass', frmlndGrass);