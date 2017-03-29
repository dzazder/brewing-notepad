var brewingNotepadApp = angular.module('brewingNotepadApp', []);

brewingNotepadApp.controller('BrewingNotepadController', ['$scope', function($scope) {
    $scope.hello = "Hello world";
}])