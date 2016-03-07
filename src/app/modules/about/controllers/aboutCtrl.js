/**
 * Created by lahim on 09/03/15.
 */

angular.module("angapp.controllers")
    .controller("AboutCtrl",
    [
        "$scope",
        "$rootScope",
        function ($scope, $rootScope) {
            $scope.message = "About page was loaded successfully";
        }
    ]
);
