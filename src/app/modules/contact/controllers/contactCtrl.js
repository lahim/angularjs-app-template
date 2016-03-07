/**
 * Created by lahim on 09/03/15.
 */

angular.module("angapp.controllers")
    .controller("ContactCtrl",
    [
        "$scope",
        "$rootScope",
        function ($scope, $rootScope) {
            $scope.message = "Contact page was loaded successfully";
        }
    ]
);
