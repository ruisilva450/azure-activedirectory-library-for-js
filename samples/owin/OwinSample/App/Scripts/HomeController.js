﻿'use strict';
app.controller('HomeController', ['$scope', '$location', 'TokenService', function ($scope, $location, TokenService) {
    // this is referencing adal module to do login
    $scope.adalAuthData = TokenService.oauthData;
    $scope.testMessage = "";
    $scope.logout = function () {
        TokenService.logOut();
    };

    $scope.login = function () {
        TokenService.login();
    };

    $scope.clearCache = function () {
        TokenService.clearCache();
    };

    $scope.renew = function () {
        // test renew for default resource
        TokenService.acquireToken().then(
            function (token) {

            }, function (err) {
                $scope.testMessage = " Renew error:" + err;
            });
    };

    $scope.$on("adal:loginSuccess", function () {
        console.log("scope gets event login sucsses");
        $scope.testMessage = "loginSuccess";
        $location.path("/home");
    });

    $scope.$on("adal:loginFailure", function () {
        console.log("scope gets event loginFailure");
        $scope.testMessage = "loginFailure";
    });

    $scope.$on("adal:notAuthorized", function (rejection) {
        console.log("scope gets event loginFailure");
        $scope.testMessage = "notAuthorized";
    });

}]);