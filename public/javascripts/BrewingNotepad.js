var brewingNotepadApp = angular.module('brewingNotepadApp', []);

brewingNotepadApp.controller('BrewingNotepadController', ['$scope', '$http', function ($scope, $http) {

// Pages
    $http.get('/api/pages')
        .then(function (data) {
            $scope.menu = data.data.data;
            console.log(data);
        }, function (error) {
            console.log('Error: ' + error);
        });

    $scope.changePage = function (id, idInternal) {
        $scope.currentPage = id;
        if (idInternal) {
            switch ($scope.currentPage) {
                case 2:
                case 21:
                    $scope.breweryPage.currentBatch = idInternal;
                    $scope.brewery.selectBatch(idInternal);
                    break;
            }
        }
    }

    $scope.getCurrentPageSrc = function () {
        for (var i = 0; i < $scope.menu.length; i++) {
            if ($scope.menu[i].id === $scope.currentPage) {
                return $scope.menu[i].src;
            }
        }

        return "main.html";
    }

// Login/Register
    $scope.user = {};
    $scope.isOpenLoginMenu = false;

// Brewery
    $scope.brewery = {}
    $scope.brewery.batches = [];

    $http.get('/api/batches')
        .then(function (data) {
            $scope.brewery.batches = data.data.data;
            console.log(data);
        }, function (error) {
            console.log('Error: ' + error);
        });
        
    $scope.breweryPage = {};
    $scope.breweryPage.currentBatch = 1;

    $scope.brewery.currentBatch = undefined;
    $scope.brewery.selectBatch = function (id) {
        for (var i = 0; i < $scope.brewery.batches.length; i++) {
            if ($scope.breweryPage.currentBatch === $scope.brewery.batches[i].id) {
                $scope.brewery.currentBatch = $scope.brewery.batches[i];
            }
        }
    }


    // test data
    $scope.currentPage = 2;
}])