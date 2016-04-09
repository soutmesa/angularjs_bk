angular.module('myangular', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
	.when('/add-new', {
		templateUrl: 'views/add-new.html',
		controller: 'insertController'
	})
	.when('/edit/:ind', {
		templateUrl: 'views/edit.html',
		controller: 'editController'
	})
	.otherwise('/');
}])
.controller('editController',['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter){
	$scope.id = $routeParams.ind;
	$scope.update = update;
	$scope.editPerson = {};
	edit();
	function edit() {
		$http.get('/angularjs_bk/api.php?act=get&id=' + $scope.id)
			.success(function(result) {
				$scope.editPerson = result;
			})
			.error(function(data,status){
				console.log(data);
			})
	}
	function update() {
		$http({
			method: 'put',
			url: '/angularjs_bk/api.php?act=put',
			data: $scope.editPerson
		}).success(function(data){
			//console.log(data);
			person = $filter('filter')($scope.people, {id: data.id})[0];
		    index = $scope.people.indexOf(person) ;
		    $scope.people[index]= data;
			swal("Updated", "Record has been update!", "success");
		});
	}
}])
.controller('insertController', ['$scope', '$http', function($scope, $http){
	$scope.insert = insert;
	function insert() {
		$http({
			method: 'post',
			url: '/angularjs_bk/api.php?act=post',
			data:  $scope.newPerson
		}).success(function(resopne){
			console.log(resopne);
			$scope.people.push(resopne);
			swal("Inserted", "Record has been inserted!", "success");
			//$location.url('/');
			console.log($scope.people);
			$scope.newPerson = {};
		});
	}
}])
.controller('testController', ['$scope', '$http', function($scope, $http){
	$scope.newPerson = {};
	$scope.show = function(){
		$http.get('/angularjs_bk/api.php?act=getall')
			.success(function(result) {
				console.log(result);
				$scope.people = result;
			})
			.error(function(data,status){
				console.log(data);
			})
	}
	$scope.show();
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
				$http({
					method: 'delete',
					url: '/angularjs_bk/api.php?act=del&id=' + id
				}).success(function(resopne){
					$scope.people.splice(index, 1);
					swal("Deleted!", "Record has been deleted!", "success");
				}).error(function(resopne){
					console.log(resopne);
				});
			}			
		});
	}
}]);
