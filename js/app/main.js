/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';
  var app = angular.module('arenastats', ['ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);

 
  app.controller("MainController", function($scope, $http) {
    
    $scope.serverName = app.serverName;

    $http.get( app.api + "arena_team/type/2" )
      .success(function(data, status, header, config) {

      $scope.teams2 = data;
    })
      .error(function(data, status, header, config) {
      console.log("Error in ArenaStats $http.get: " + app.api + "arena_team/type/2");
    });

  });
  
}());
