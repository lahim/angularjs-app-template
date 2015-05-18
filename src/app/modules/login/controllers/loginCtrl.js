/**
 * Created by lahim on 12/03/15.
 */

angular.module("sample.controllers")
    .controller(
    "LoginCtrl",
    [
        "$scope",
        "$rootScope",
        "$http",
        "$location",
        "$cookies",
        "authFactory",
        function ($scope, $rootScope, $http, $location, $cookies, authFactory) {
            $scope.user = {
                username: null,
                password: null
            };

            var login = function (result) {
                delete $cookies.token;

                $cookies.token = result.token;
                delete $http.defaults.headers.common["Authorization"];

                $http.defaults.headers.common["Authorization"] = "Token " + result.token;
                $rootScope.loggedIn = true;
                $rootScope.user = result.user;
                $location.path("/dashboard");
            };

            $scope.login = function () {
                var user = new authFactory($scope.user);

                user.$save().then(
                    function (result) {
                        login(result);
                    },
                    function (errors) {
                        $rootScope.serveError(errors);
                    }
                );
            };

            $scope.facebookLogin = function () {
                alert("Facebook login is not supported yet.");
            };
        }
    ]
);