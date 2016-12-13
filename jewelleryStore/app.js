(function() {
  var app = angular.module('jewelleryStore', ['product-directives']);

  app.controller('StoreController', ['$http' , function($http){
    var store = this;
    store.products = [];
     $http.get('/products.json').success(function(data){
    store.products = data;
    });
  }]);

  // app.controller('TabController', function(){
  //   this.tab  = 1;

  //   this.setTab = function(value){
  //     this.tab = value;
  //   };

  //   this.isSet = function(value){
  //     return this.tab === value;
  //   };

  // });

  app.controller('GalleryController', function(){
   this.current = 0;
    
    this.setCurrent = function(value){
      this.current = value || 0;
    };
  });

  app.controller('ReviewController', function(){
   this.review = {};
   this.addReview = function(product){
   	this.review.createdOn = Date.now();
     product.reviews.push(this.review);
      this.review = {};
    };
  });

})();
