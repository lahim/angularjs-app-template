/**
 * Created by lahim on 12/03/15.
 */

angular.module("angapp.services")
    .factory(
    "profileFactory",
    [
        "$resource",
        "appConfig",
        function ($resource, appConfig) {
            return $resource(
                appConfig.apiUrl + "me/ ",
                {},
                {}
            )
        }
    ]
);
