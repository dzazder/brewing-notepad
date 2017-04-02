var brewingNotepadApp = angular.module('brewingNotepadApp', []);

brewingNotepadApp.controller('BrewingNotepadController', ['$scope', '$http', function ($scope, $http) {



    $scope.menu = [
        {
            id: 1,
            label: "Main page",
            src: "main.html",
            showInMenu: 'home'
        },
        {
            id: 2,
            label: "Yours batches",
            src: "batches.html",
            showInMenu: 'home'
        },
        {
            id: 3,
            label: "IBU Calculator",
            src: "calcibu.html",
            showInMenu: 'calculators'
        },
        {
            id: 4,
            label: "Alcohol calculator",
            src: "calcvolume.html",
            showInMenu: 'calculators'
        },
        {
            id: 21,
            label: "Batch",
            src: "batch.html",
        },
        {
            id: 22,
            label: "New batch",
            src: "newbatch.html"
        }
    ];

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

    $scope.brewery = {}
    $scope.brewery.batches = [];

    $http.get('/api/batches')
        .then(function (data) {
            $scope.brewery.batches = data.data.data;
            console.log(data);
        }, function (error) {
            console.log('Error: ' + error);
        });

    

    //     {
    //         id: 1,
    //         name: "English breakfast",
    //         styleId: 1,
    //         styleName: "English Pale Ale",
    //         og: 12,
    //         fg: 4,
    //         brewingDate: '2016-01-01',
    //         bottlingDate: '2016-01-21'

    //     },
    //     {
    //         id: 2,
    //         name: "Tropical Joke",
    //         styleId: 2,
    //         styleName: "American Pale Ale",
    //         blg: 14
    //     },
    //     {
    //         id: 3,
    //         name: "Great Ivan",
    //         styleId: 3,
    //         styleName: "Russian Imperial Stout",
    //         blg: 24
    //     }
    // ]

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