/**
 * Created by lahim on 09/03/15.
 */

angular.module("angapp.controllers")
    .controller("DashboardCtrl",
    [
        "$scope",
        "$rootScope",
        function ($scope, $rootScope) {
            $scope.message = "Dashboard page was loaded successfully";
        }
    ]
);
