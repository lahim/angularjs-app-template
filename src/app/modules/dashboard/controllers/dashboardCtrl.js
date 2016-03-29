/**
 * Created by lahim on 09/03/15.
 */

angular.module("angapp.controllers")
    .controller("DashboardCtrl",
    [
        "$scope",
        "$rootScope",
        "appConfig",
        function ($scope, $rootScope, appConfig) {
            $scope.message = "Dashboard page was loaded successfully";
        }
    ]
);
