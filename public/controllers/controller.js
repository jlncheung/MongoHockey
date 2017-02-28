var app = angular.module('myApp',['720kb.datepicker']);
app.controller('myCtrl',['$scope','$http', function($scope, $http){
	function refresh(){
		$http.get('/canucksScore').then(function(response){
			console.log("Data recieved");
			$scope.canucksScore = response.data;
			$scope.score= null;
		});
	};

	refresh();

	$scope.addEntry = function(){
		console.log($scope.score);
		$http.post('/canucksScore', $scope.score).then(function(response){
			console.log(response.data);
			refresh();
		})
	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/canucksScore/' + id).then(function(response){
			console.log(response.data);
			refresh();
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/canucksScore/' + id).then(function(repsonse){
			$scope.score = repsonse.data;
		});
	};

	$scope.update = function(){
		console.log('/canucksScore/' + $scope.score._id);
		$http.put('/canucksScore/' + $scope.score._id, $scope.score).then(function(response){
			refresh();
		});
	};

	$scope.deselect = function(){
		$scope.score=null;
	};


}]);

