(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'listItemsFound.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
};
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;
  
  list.getFilteredItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      list.found = response;
      if (list.found.length == 0) {
        list.msg = "Nothing found"
      }else{
        list.msg = "";
      }
    })
    .catch(function (error) {
      console.log("Something wrong")
    })
  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex,1);
  }
};

};
MenuSearchService.$inject = ['ApiBasePath', '$http'];
function MenuSearchService(ApiBasePath, $http){
  var service = this;
  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result){
      var foundItems = [];
      if(searchTerm == '' || !searchTerm){
          return foundItems;
      }else{
        for (var i=0;i<result.data.menu_items.length;i++){
          //console.log(result.data.menu_items[i]);
          if(result.data.menu_items[i].description.includes(searchTerm)){
              foundItems.push(result.data.menu_items[i]);
          }
        };
        return foundItems;
      }
      });
  };
};

})();
