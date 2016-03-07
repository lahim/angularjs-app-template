"use strict";

angular.module("angapp", [
    "ngRoute",
    "ngResource",
    "ngCookies",
    "ui.bootstrap",
    "angapp.controllers",
    "angapp.services",
    //"angapp.directives",
    //"angapp.directives.templates",
    "angapp.templates",
    //"angapp.filters"
])
    .config([
        "$provide", "$routeProvider",
        function ($provide, $routeProvider) {
            $provide.factory("appConfig", function () {
                var getApiUrl = function () {
                    return "http://localhost:8000/api/1.0/";
                };

                var getTokenUrl = function () {
                    if (typeof baseURL === "undefined") {
                        return "/token/";
                    }
                    return baseURL + "/token/ ";
                };

                return {
                    apiUrl: getApiUrl(),
                    tokenUrl: getTokenUrl()
                }
            });

            $routeProvider
                .when("/login", { // --------/ login & registration urls /--------
                    templateUrl: "login/templates/login.html",
                    controller: "LoginCtrl"
                })
                .when("/logout", {
                    templateUrl: "login/templates/logout.html",
                    controller: "LogoutCtrl"
                })
                .when("/dashboard", { // --------/ dashboard urls /--------
                    templateUrl: "dashboard/templates/dashboard.html",
                    controller: "DashboardCtrl",
                    //auth: true,
                    auth: false,
                    pageName: "dashboard"
                })
                .when("/about", { // --------/ about urls /--------
                    templateUrl: "about/templates/about.html",
                    controller: "AboutCtrl",
                    //auth: true,
                    auth: false,
                    pageName: "about"
                })
                .when("/contact", { // --------/ contact urls /--------
                    templateUrl: "contact/templates/contact.html",
                    controller: "ContactCtrl",
                    //auth: true,
                    auth: false,
                    pageName: "contact"
                })
                .otherwise({ // --------/ otherwise url /--------
                    redirectTo: "/dashboard"
                });
        }])
    .run([
        "$rootScope",
        "$http",
        "$cookies",
        "$route",
        "$location",
        "$timeout",
        "profileFactory",
        function ($rootScope, $http, $cookies, $route, $location, $timeout, profileFactory) {

            $rootScope.loggedIn = true;  // fixme: remove this line if you added an API auth endpoint!

            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (next) {
                    if (next.auth && !$rootScope.loggedIn) {
                        console.log("token", $cookies.token);
                        console.log(next);

                        if ($cookies.token) {
                            $http.defaults.headers.common["Authorization"] = "Token " + $cookies.token;

                            // todo: add a function which will be responsible for loading a user profie data - below you can find an example of use a profileFactory
                            profileFactory.get().$promise.then(
                                function (result) {
                                    $rootScope.user = result;
                                    $rootScope.loggedIn = true;
                                }, function (errors) {
                                    console.log(errors);
                                    $http.defaults.headers.common["Authorization"] = undefined;
                                    $location.path("/login");
                                }
                            );

                        } else {
                            $location.path("/login");
                        }
                    }

                    if (next.pageName) {
                        $rootScope.pageName = next.pageName;
                    } else {
                        $rootScope.pageName = "";
                    }
                }
            });

            $rootScope.$watch("loggedIn", function (oldValue, newValue) {
                if ($rootScope.loggedIn) {
                    $rootScope.logout = function () {
                        delete $cookies.token;
                        delete $cookies.sessionid;
                        delete $cookies.csrftoken;
                        $rootScope.loggedIn = false;
                        $rootScope.user = null;
                        $http.defaults.headers.common["Authorization"] = "";
                        $location.path("/logout");
                    };
                }
            });
        }
    ]);

function alert(alert_type, html) {
    $.niftyNoty({
        type: alert_type,
        container: "floating",
        html: html,
        timer: 6000
    });
}

function pageAlert(alert_type, html) {
    $.niftyNoty({
        type: alert_type,
        container: 'page',
        html: html,
        timer: 10000
    });
}

function validationErrorsHandler(errors) {
    var data = errors.data;
    for (var field in data) {
        if (data.hasOwnProperty(field)) {
            var html = "";
            $.each(data[field], function (idx, el) {
                html += "<p><strong>" + field + "</strong>: " + el + "</p>"
            });
            pageAlert("danger", html);
        }
    }
    if (data.non_field_errors && data.non_field_errors.length > 0) {
        $.each(data.non_field_errors, function (idx, el) {
            var html = "<p>" + el + "</p>";
            pageAlert("danger", html);
        });
    }
}

// COMMON MODULES
angular.module("angapp.services", []);
//angular.module("angapp.directives", []);
angular.module("angapp.modals", []);
//angular.module("angapp.filters", []);
angular.module("angapp.controllers", []);
