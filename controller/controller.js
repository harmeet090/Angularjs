var angularApp = angular.module('angularApp', ['ngRoute', 'ui.bootstrap']).factory('serviceInfo', function ($http){

    'use strict';
    return $http.get('data/json/data.json');

});

angularApp.controller('homeCntrl', function ($scope,serviceInfo, $location){
	
	serviceInfo.success(function(data)
	{
		$scope.menu= data;
		$scope.navbar= data.nav;
		$scope.navbarRight= data.navRight;
	})
});

angularApp.directive('isActiveNav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function(scope, element) {
   scope.location = $location;
   scope.$watch('location.path()', function(currentPath) {
     if('#' + currentPath === element[0].attributes['href'].value) {
       element.parent().addClass('active');
     } else {
       element.parent().removeClass('active');
     }

   });
 }
 };
}]);


angularApp.controller('bannerCntrl',function($scope,serviceInfo){

	serviceInfo.success(function(data)
	{
		$scope.content=data.banner;
	})
});

angularApp.controller('mainContent',function($scope,serviceInfo){

	serviceInfo.success(function(data)
	{
		$scope.contents=data.content;
		
	})
});

angularApp.controller('detailController',function($scope,serviceInfo,$routeParams){

	serviceInfo.success(function(data)
	{
		$scope.details = data.content[$routeParams.id];
	})
});

angularApp.controller('angular', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 1200 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }
});

angularApp.controller('imagegallery', function($scope){

			$scope.pics = [
				{src:'abstract-q-c-950-450-5.jpg', alt:"Abstract Image", title:"Abstract Image"},
				{src:'abstract-q-c-950-450-6.jpg', alt:"Abstract Image", title:"Abstract Image"},
				{src:'city-q-c-950-450-3.jpg', alt:"City", title:"City"},
				{src:'nightlife-q-c-950-450-3.jpg', alt:"Nightlife", title:"Nightlife"},
				{src:'nightlife-q-c-950-450-6.jpg', alt:"Nightlife", title:"Nightlife"},
				{src:'technics-q-c-950-450-2.jpg', alt:"Technics", title:"Technics"}
			];
			$scope.img = {};
			
			$scope.loadPage = function(){
				$scope.img.src = $scope.pics[0].src;
				$scope.img.alt = $scope.pics[0].alt;
				$scope.img.title = $scope.pics[0].title;
			};
			$scope.loadPage();
			
			$scope.openPic = function(){
				$scope.img.src = this.pic.src;
				$scope.img.alt = this.pic.alt;
				$scope.img.title = this.pic.title;
			};
		});

angularApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider)
{
	$locationProvider.html5Mode(false);
	//$locationProvider.html5Mode(true);
	$routeProvider
	.when('/',{
		templateUrl:'view/home.html',
		controller:'homeCntrl'
	})
	.when('/projects',{
		templateUrl:'view/projects.html',
		//controller:'project'
	})
	.when('/services',{
		templateUrl:'view/services.html',
		//controller:'services'
	})
	.when('/angularJS',{
		templateUrl:'view/angular.html',
		//controller:'angular'
	})
	.when('/jquery',{
		templateUrl:'view/jquery.html',
		//controller:'jquery'
	})
	.when('/imagegallery',{
		templateUrl:'view/imagegallery.html',
		controller:'imagegallery',

	})
	.when('/contact',{
		templateUrl:'view/contact.html',
		//controller:'contact'
	})
	.when('/:id',{
		templateUrl:'view/detail.html',
		controller:'detailController'
	})
}]);
