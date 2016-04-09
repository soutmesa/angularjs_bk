angular.module('myangular', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
	.when('/add-new', {
		templateUrl: 'views/add-new.html'
	}).otherwise('/');
	// $locationProvider.html5Mode(true);
}])
.controller('testController', ['$scope', '$filter', '$http', '$location', function($scope, $filter, $http, $location){
	$scope.newPerson = {};
	$scope.show = function(){
		$http.get('/angularjs_bk/api.php?act=get')
			.success(function(result) {
				console.log(result);
				$scope.people = result;
			})
			.error(function(data,status){
				console.log(data);
			})
	}
	$scope.show();
	function insert() {

		$http({
			method: 'post',
			url: '/angularjs_bk/api.php?act=post',
			data:  $scope.newPerson
		}).success(function(resopne){
			console.log(resopne);

			$scope.people.push(resopne);
			
			swal("Inserted", "Record has been inserted!", "success");
			$location.url('/');
			console.log($scope.people);
			$scope.newPerson = {};
		});
	}
	$scope.check = function(){
		if(!!$scope.newPerson.id){
			update();
		}else{
			insert();
		}
	}
	$scope.edit = function(person){
		$scope.newPerson = person;
	}
	function update() {
		$http({
			method: 'put',
			url: '/angularjs_bk/api.php?act=put',
			data: $scope.newPerson
		}).success(function(data){
			//console.log(data);
			swal("Updated", "Record has been update!", "success");
			$scope.newPerson = {};
		});
	}
	$scope.delete = function(id, index){
		// if(alertMe()){
		// 	$http({
		// 		method: 'delete',
		// 		url: '/angularjs_bk/api.php?act=del&id=' + id
		// 	}).success(function(resopne){
		// 		$scope.people.splice(index, 1);
		// 	}).error(function(resopne){
		// 		console.log(resopne);
		// 	});
		// }
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
