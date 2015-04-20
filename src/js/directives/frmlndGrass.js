(function() {

	var frmlndGrass = function($window, $interval, $timeout) {
		return {
			restrict: 'E',
			transclude: false,
      		controller: ['$scope', 
      			function($scope) {
					$scope.frmlndGrow = function() {
						$scope.initGrow();
					};
				}
			],
			link: function(scope, element, attrs) {

				var blades = [];

				scope.initGrow = function() {

					// Observe the element's dimensions.
					var dimensions = {
						w: element[0].offsetParent.clientWidth,
						h: element[0].offsetParent.clientHeight
					};

					// Create grass blades and add them to the DOM
					if (blades.length == 0) {
						for (var i=1; i<dimensions.w; i++) {
							blades[i] = angular.element('<div class="blade" style="left: ' + i + 'px"></div>');
							element.append(blades[i]);
						}
					}

					// Make the grass grow
					var count = 0;
					var intervalLength = 17;
					var duration = (attrs.duration) ? attrs.duration : 2500;
					scope.growGrass = $interval(function() {
						if (count * intervalLength > duration) {
							$interval.cancel(scope.growGrass);
							scope.$emit('frmlndGrowComplete');
						}

						var repeat = duration / intervalLength;
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

				};

				if (attrs.auto === 'true') {
					$timeout(function() {
						scope.initGrow();
					}, (attrs.delay) ? attrs.delay : 2000);
				}
			}
		}
	};

	frmlndGrass.$inject = ['$window', '$interval', '$timeout'];
	angular.module('frmlnd-grass').directive('frmlndGrass', frmlndGrass);

})();