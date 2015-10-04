/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';
  var app = angular.module('arenastats', ['ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);

  app.controller("HomeController", function($scope, $rootScope, $http) {

    $http.get( app.api + "arena_team/2" )
      .success(function(data, status, header, config) {
      $scope.teams2 = data;
    })
      .error(function(data, status, header, config) {
      console.log("Error in ArenaStats $http.get arena_team/2");
    });

  });

}());
