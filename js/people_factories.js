angular
	.module('myangular')
	.factory('peopleFactory', ['$http', function($http){
		var factory = {};
		var url = '/angularjs_bk/api.php?act=';
		factory.insert = function(data, successCallback, errorCallback) {
			$http({
				method: 'post',
				url: '/angularjs_bk/api.php?act=post',
				data: data
			}).success(function(resopne){
				successCallback(resopne)				
			}).error(function(resopne){
				errorCallback(resopne);
			});
		}

		factory.getPeople = function(successCallback){
			$http.get(url+'getall')
				.success(function(result) {
					successCallback(result);
				})
				.error(function(data,status){
					console.log(data);
				});
		}
		factory.edit = function(id, successCallback){
			$http.get(url+'get&id='+id)
			.success(function(resopne) {
				successCallback(resopne);
			})
			.error(function(resopne){
				console.log(resopne);
			})
		}
		factory.update = function(data, successCallback) {
			$http({
				method: 'put',
				url: url+'put',
				data: data
			}).success(function(data){
				successCallback(data);
			});
		}
		factory.delete = function(id){
			return $http({
				method: 'delete',
				url: url+'del&id=' + id
			});
		}

		return factory;
	}])