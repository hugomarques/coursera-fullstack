'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes= menuFactory.getDishes();
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.dish= menuFactory.getDish(3);
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            $scope.dishDetail={};
            $scope.dishDetail.author="";
            $scope.dishDetail.rating=5;
            $scope.dishDetail.comment="";
            $scope.dishDetail.date = new Date().toISOString();
            
            $scope.submitComment = function () {
                
                //Step 2: This is how you record the date
                $scope.dishDetail.date = new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.dishDetail);
                
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
                $scope.dishDetail = {author: "", rating: 5, date: new Date().toISOString(), comment: ""};
            };
        }]);
