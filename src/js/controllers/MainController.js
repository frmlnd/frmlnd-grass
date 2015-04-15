(function() {

	var mainController = function($rootScope, $sce) {
		var vm = this;
		vm.isDisabled = false;
		vm.isClicked = false;
		vm.buttonText = function() {
			return (vm.isClicked) ? $sce.trustAsHtml('Grow More') : $sce.trustAsHtml('Grow');
		};

		$rootScope.$on('frmlndGrowComplete', function() {
			vm.isDisabled = false;
		});
	};

	mainController.$inject = ['$rootScope', '$sce'];
	angular.module('frmlnd-grass').controller('MainController', mainController);

})();
