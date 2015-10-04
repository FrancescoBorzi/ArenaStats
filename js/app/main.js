/*jslint browser: true, white: true, plusplus: true, eqeq: true*/
/*global angular, console, alert*/

(function () {
  'use strict';
  var app = angular.module('arenastats', ['ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);


  app.controller("MainController", function($scope, $http) {

    $scope.serverName = app.serverName;
    $scope.apiLoaded = true;
    $scope.showSpecific = false;

    $scope.tabs = {
      tab2 : true,
      tab3 : false,
      tab5 : false
    };

    var processTeams = function (teams) {
      teams.forEach(function(team) {

        if (team.rank == 0) {
          team.rank = 9999; // we need to put teams with rank 0 at bottom
        }

        switch (parseInt(team.captainRace, 10)) {
          case 2:
          case 5:
          case 6:
          case 8:
          case 9:
          case 10:
            team.faction = "horde";
            break;

          case 1:
          case 3:
          case 4:
          case 7:
          case 11:
            team.faction = "alliance";
            break;
        }

      });
    };

    $http.get( app.api + "arena_team/type/2" )
      .success(function(data, status, header, config) {
      $scope.teams2 = data;
      processTeams($scope.teams2);
    })
      .error(function(data, status, header, config) {
      console.log("Error in ArenaStats $http.get: " + app.api + "arena_team/type/2");
      $scope.apiLoaded = false;
    });

    $http.get( app.api + "arena_team/type/3" )
      .success(function(data, status, header, config) {
      $scope.teams3 = data;
      processTeams($scope.teams3);
    })
      .error(function(data, status, header, config) {
      console.log("Error in ArenaStats $http.get: " + app.api + "arena_team/type/3");
      $scope.apiLoaded = false;
    });

    $http.get( app.api + "arena_team/type/5" )
      .success(function(data, status, header, config) {
      $scope.teams5 = data;
      processTeams($scope.teams3);
    })
      .error(function(data, status, header, config) {
      console.log("Error in ArenaStats $http.get: " + app.api + "arena_team/type/3");
      $scope.apiLoaded = false;
    });

  });

}());
