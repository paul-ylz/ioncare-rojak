angular.module('careville.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

// Opps == Opportunities
.controller('CardsCtrl', function($scope, $rootScope, $http, TDCardDelegate, $ionicSideMenuDelegate, $timeout) {
  // prevent side menu dragging from intefering with card
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.cards = [];
  $scope.bin = [];
  $scope.pocket = [];

  $http.get('http://rojaks2dev.cafecompassion.com/api/v1/opps').then(
  function(resp){
    console.log(resp);
    $scope.cards = resp.data;
  }, function(err) {
    console.error(err);
  })

  $scope.cardSwipedLeft = function(index) {
    console.log('cardSwipedLeft, index: ', index);
    $scope.trashCard();
  };

  $scope.userSwipedRight = function(index) {
    console.log("userSwipedRight");
    $scope.pocketCard();
  };

  $scope.pass = function() {
    var currentCard = TDCardDelegate.$getByHandle('opps').getFirstCard();
    currentCard.swipe('left').then($timeout( $scope.trashCard, 250));
  };

  $scope.moreInfo = function() {
    alert('more info');
  };

  $scope.userPressedSave = function() {
    console.log("userPressedSave");
    var currentCard = TDCardDelegate.$getByHandle('opps').getFirstCard();
    currentCard.swipe('right').then($timeout( $scope.pocketCard, 250));
  };

  $scope.pocketCard = function() {
    var rm = $scope.cards.shift();
    $scope.pocket.push(rm);
    // displays the number in the pocket
    $rootScope.pocketLen = $scope.pocket.length;
    console.log('pocket: ' + $scope.pocket);
  };

  $scope.trashCard = function() {
    var rm = $scope.cards.shift()
    $scope.bin.unshift(rm);
    console.log('bin: ',  $scope.bin );
  };
});
