(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
console.log("test")
// injecting service into controller ToBuyController
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemsList = this;

  itemsList.items = ShoppingListCheckOffService.getItemsToBuy();

  itemsList.itemIsBought = function(itemIndex){
    ShoppingListCheckOffService.itemIsBought(itemIndex);
  }
}
// injecting service into controller AlreadyBoughtController
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(ShoppingListCheckOffService){
  var itemsShow = this;

  itemsShow.items = ShoppingListCheckOffService.getItemsBought();

};

function ShoppingListCheckOffService(){
  var service = this;
  // list of items to buy
  var itemsToBuy = [
    {
      name : "cookies",
      quantity : "10 bags"
    },
    {
      name : "milk",
      quantity : "1L"
    },
    {
      name : "bread",
      quantity : "1"
    },
    {
      name : "yougurt",
      quantity : "2"
    },
    {
      name : "pasta",
      quantity : "5kg"
    }
  ];
  var itemsBought = [];

  service.addItem = function(itemName, itemQuantity){
    var item = {
      name : itemName,
      quantity : itemQuantity
    };
    itemsBought.push(item);
  };

  service.getItemsToBuy = function(){
    return itemsToBuy;
  };

  service.getItemsBought = function(){
    return itemsBought;
  };

  service.itemIsBought = function(itemIndex){
    var itemToAdd = itemsToBuy[itemIndex];
console.log(itemIndex);
    itemsBought.push(itemToAdd);
    itemsToBuy.splice(itemIndex, 1);
  }
};

})();
