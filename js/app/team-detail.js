/*jslint browser: true, white: true, plusplus: true, eqeq: true*/
/*global angular, console, alert*/

(function () {
  'use strict';
  var app = angular.module('arenastats');

  app.controller("TeamDetailsController", function($rootScope, $stateParams, $scope, $http) {

    $scope.teamDetails = [];
    $scope.members = [];

    $http.get( app.api + "arena_team/id/" + $stateParams.id )
      .success(function(data, status, header, config) {

      if (data.length > 0) {

        $scope.teamDetails = angular.copy(data[0]);

        $scope.teamDetails.seasonLosses = data[0].seasonGames - data[0].seasonWins;
        $scope.teamDetails.weekLosses   = data[0].weekGames - data[0].weekWins;

        switch (parseInt($scope.teamDetails.captainRace, 10)) {
          case 2:
          case 5:
          case 6:
          case 8:
          case 9:
          case 10:
            $scope.teamDetails.captainFaction = "horde";
            break;

          case 1:
          case 3:
          case 4:
          case 7:
          case 11:
            $scope.teamDetails.captainFaction = "alliance";
            break;
        }

        $http.get( app.api + "arena_team_member/" + $stateParams.id )
          .success(function(data, status, header, config) {

          data.forEach(function (member) {
            $scope.members.push(member);
          });

          $scope.members.forEach(function (member) {
            member.seasonLosses = member.seasonGames - member.seasonWins;
            member.weekLosses = member.weekGames - member.weekWins;
            member.weekNeeded = member.weekGames > 9 ? 0 : 10 - member.weekGames;
          });

          console.log("[INFO] Loaded team " + $stateParams.id);

        })
          .error(function(data, status, header, config) {
          console.log("Error in ArenaStats $http.get: " + app.api + "arena_team_member/" + $stateParams.id);
        });

      } else {
        console.log("Team " + $stateParams.id + " not found.");
      }
    })
      .error(function(data, status, header, config) {
      console.log("Error in ArenaStats $http.get: " + app.api + "arena_team/id/" + $stateParams.id);
    });


  });

}());
