'use strict';

describe('shoppishoppingCart module', function() {
    beforeEach(module('shoppishoppingCart'));


    describe('value - version', function() {
        it('should return current version', inject(function(version) {
            expect(version).toEqual('1.0.0');
        }));
    });


    describe('CartController', function() {

        var $controller;

        beforeEach(inject(function(_$controller_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        describe('$scope.shoppishoppingCart', function() {

            var $scope;
            var controller;

            function addItem(id, name, price, quantity, data){
                $scope.shoppishoppingCart.addItem(id, name, price, quantity, data);
            }

            beforeEach(function() {
                $scope = {};
                controller = $controller('CartController', {$scope: $scope});

            });

            it('sets instance of shoppingCart to scope', function() {
                expect(typeof $scope.shoppingCart).toEqual('object');
            });


            it('should be able to add an item', function() {
                addItem(1, 'Test Item', 10, 2);
                expect($scope.shoppingCart.getItems().length).toEqual(1);
            });


             it('should be able to empty', function() {
                $scope.shoppingCart.empty();
                expect($scope.shoppingCart.getItems().length).toEqual(0);
            });

            it('should be able to show isEmpty', function() {
                $scope.shoppingCart.empty();
                expect($scope.shoppingCart.isEmpty()).toEqual(true);
            });


            describe('shoppingCart', function() {


                beforeEach(function(){

                    $scope.shoppingCart.setTaxRate(7.5);
                    $scope.shoppingCart.setShipping(12.50);
                    addItem(1, 'Work boots', 189.99, 1);
                    addItem(2, 'Hockey gloves', 85, 2);
                    addItem('cpBow', 'Compound bow', 499.95, 1);
                });



                it('tax should be set', function() {
                    expect($scope.shoppingCart.getTaxRate()).toEqual(7.5);
                });

                it('shipping should be set', function() {
                    expect($scope.shoppingCart.getShipping()).toEqual(12.50);
                });

                it('tax charge should be ', function() {
                    expect($scope.shoppingCart.getTax()).toEqual(64.5);
                });

                it('count items in total', function() {
                    expect($scope.shoppingCart.getTotalItems()).toEqual(4);
                });

                it('count unique items in cart', function() {
                    expect($scope.shoppingCart.getTotalUniqueItems()).toEqual(3);
                });


                it('check getItems has correct number of items', function() {
                    expect($scope.shoppingCart.getItems().length).toEqual(3);
                });

                it('Have correct getSubTotal', function() {
                    expect($scope.shoppingCart.getSubTotal()).toEqual(859.94);
                });
                
                it('should be able to show isEmpty correctly as false', function() {
                    expect($scope.shoppingCart.isEmpty()).toEqual(false);
                });

                it('Have correct totalCost', function() {
                    expect($scope.shoppingCart.totalCost()).toEqual(936.94);
                });


                it('find item by id (by int) ', function() {
                    expect($scope.shoppingCart.getItemById(2).getName()).toEqual('Hockey gloves');
                });


                it('find item by id (by string) ', function() {
                    expect($scope.shoppingCart.getItemById('cpBow').getName()).toEqual('Compound bow');
                });


                it('remove item by ID', function() {
                    $scope.shoppingCart.removeItemById('cpBow');
                    expect($scope.shoppingCart.getItemById('cpBow')).toEqual(false);
                    expect($scope.shoppingCart.getTotalUniqueItems()).toEqual(2);
                });


                it('remove item by ID', function() {
                    $scope.shoppingCart.removeItemById('cpBow');
                    expect($scope.shoppingCart.getItemById('cpBow')).toEqual(false);
                });

                it('should create an object', function() {
                    var obj =  $scope.shoppingCart.toObject();
                    expect(obj.shipping).toEqual( 12.50 );
                    expect(obj.tax).toEqual( 64.5 );
                    expect(obj.taxRate).toEqual( 7.5 );
                    expect(obj.subTotal).toEqual( 859.94 );
                    expect(obj.totalCost).toEqual( 936.94 );
                    expect(obj.items.length).toEqual( 3 );
                });


            });

            describe('shoppingCartItem', function() {

                var shoppingCartItem;

                beforeEach(function(){
                    addItem('lRope', 'Lariat rope', 39.99);
                    shoppingCartItem = $scope.shoppingCart.getItemById('lRope');
                });


                it('should have correct Name', function() {
                    expect(shoppingCartItem.getName()).toEqual('Lariat rope');
                });

                it('should default quantity to 1', function() {
                    expect(shoppingCartItem.getQuantity()).toEqual(1);
                });

                it('should update quantity', function() {
                    expect(shoppingCartItem.getName()).toEqual('Lariat rope');
                });

                it('should absolutely update quantity', function() {
                    expect(shoppingCartItem.getQuantity()).toEqual(1);
                    shoppingCartItem.setQuantity(5);
                    expect(shoppingCartItem.getQuantity()).toEqual(5);
                });

                it('should relatively update quantity', function() {
                    expect(shoppingCartItem.getQuantity()).toEqual(1);
                    shoppingCartItem.setQuantity(1, true);
                    expect(shoppingCartItem.getQuantity()).toEqual(2);
                });


                it('should get total', function() {
                    expect(shoppingCartItem.getTotal()).toEqual(39.99);
                });

                it('should update total after quantity change', function() {
                    shoppingCartItem.setQuantity(1, true);
                    expect(shoppingCartItem.getTotal()).toEqual( 79.98 );
                });


                it('should create an object', function() {
                    var obj = shoppingCartItem.toObject();
                    expect(obj.id).toEqual( 'lRope' );
                    expect(obj.name).toEqual( 'Lariat rope' );
                    expect(obj.price).toEqual( 39.99 );
                    expect(obj.quantity).toEqual( 1 );
                    expect(obj.data).toEqual( null );
                    expect(obj.total).toEqual( 39.99 );
                });


            })

        })
    });
});
