var app = angular.module('frmlnd-grass', []);

/*
(function() {

	var w = $(window).width();
	var h = $(window).height();

	var blades = [];
	for (var i=1; i<w; i++) {
		blades[i] = $('<div/>', {
			class: 'blade',
			style: 'left: ' + i + 'px'
		});
		blades[i].appendTo($('#grass'));
	}

	var count = 0;
	var interval = setInterval(function() {
		if (count > 10000) {
			clearInterval(interval);
		}
		var blade_index = Math.floor(Math.random() * (w - 1) + 1);
		if (blade_index) {
			var grow_distance = Math.floor(Math.random() * (10 - 1) + 1);
			var rotate = Math.floor(Math.random() *20) + 1;
			rotate *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
			var current_height = parseInt($(blades[blade_index]).css('height'));
			$(blades[blade_index]).css('height', current_height + grow_distance + 'px');
			$(blades[blade_index]).css('transform', 'rotate(' + rotate + 'deg)');
			count++;
		}
	}, 0);

})();
*/