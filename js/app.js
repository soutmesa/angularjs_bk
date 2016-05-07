angular.module('myangular', ['ui.router'])
// ngRoute
// .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
// 	$locationProvider.html5Mode(true);
// 	$routeProvider
// 	.when('/add-new', {
// 		templateUrl: 'views/add-new.html',
// 		controller: 'insertController'
// 	})
// 	.when('/edit/:ind', {
// 		templateUrl: 'views/edit.html',
// 		controller: 'editController'
// 	})
// 	.otherwise('/');
// }])
// ===================================================================================================================================
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise("/");
	$stateProvider
    .state('addNew', {
      url: "/add-new",
      templateUrl: "views/add-new.html",
      controller: 'insertController'
    })
    .state('edit', {
      url: "/edit/:ind",
      templateUrl: "views/edit.html",
      controller: 'editController'
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "views/404.html",
      controller: 'testController'
    })
    .state('about', {
      url: "/about",
      templateUrl: "views/404.html",
      controller: 'testController'
    })
}])

.directive('search', function(){
	return {
		template: '<p>hello</p>',
		replace: true
	}
})

.controller('editController',['$scope', '$stateParams', 'peopleFactory','$filter' , function($scope, $stateParams, peopleFactory, $filter){
	$scope.id = $stateParams.ind;
	$scope.update = update;
	$scope.editPerson = {};
	
	function init(){
		peopleFactory.edit($scope.id, assignPerson);
	}
	function assignPerson(result){
		$scope.editPerson = result;
	}
	function update(data){
		peopleFactory.update($scope.editPerson, renderPeople);
	}

	function renderPeople(data) {
		person = $filter('filter')($scope.people, {id: data.id})[0];
    index = $scope.people.indexOf(person) ;
    $scope.people[index] = data;
		swal("Updated", "Record has been update!", "success");
	}
	init();
}])
.controller('insertController', ['$scope', '$http', 'peopleFactory', function($scope, $http, peopleFactory){
	$scope.insert = insert;

	function insert() {
		if ($scope.frm.$valid) {
			peopleFactory.insert($scope.newPerson, appendPeople);	
		}
	}

	function appendPeople(resopne) {
		console.log(resopne);
		$scope.people.push(resopne);
		swal("Inserted", "Record has been inserted!", "success");
		console.log($scope.people);
		$scope.newPerson = {};
	}
}])
.controller('testController', ['$scope', '$http', '$location', 'peopleFactory' , function($scope, $http, $location, peopleFactory){
	$scope.newPerson = {};
	$scope.isActive = function(viewLocation){
		var active = (viewLocation === $location.path());
		return active;
	}
	
	function init() {
		peopleFactory.getPeople(renderPeople);	
	}

	function renderPeople(result) {
		$scope.people = result;
	}

	$scope.delete = function(id, index){
		swal({
			title: "Are you sure?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonColor: '#DD6B55',
			closeOnConfirm: false
		},
		function(isConfirm){
			if(isConfirm){
				peopleFactory.delete(id).success(function(){
					removePerson(id, index);
				});
			}			
		});
	}
	function removePerson(id, index){
		$scope.people.splice(index, 1);
		swal("Deleted!", "Record has been deleted!", "success");
	}
	init();
}]);



