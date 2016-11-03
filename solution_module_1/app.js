(function () {
'use strict';

angular.module('lunchCheck', [])

.controller('LunchCheckController', function ($scope) {
$scope.lunchMenu = "";
$scope.message = "";
$scope.check = function(){

  if ($scope.lunchMenu){
    var itemList = $scope.lunchMenu.split(',');
    if (itemList.length == 0){
        $scope.message = "Please enter data first"
    }else if (itemList.length <= 3){
        $scope.message = "Enjoy!"
    }else if (itemList.length > 3){
        $scope.message = "Too much!"
    }
  }else{
    $scope.message = "Please enter data first"
  }
}
});

})();
