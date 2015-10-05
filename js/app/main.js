/*jslint browser: true, white: true, plusplus: true, eqeq: true*/
/*global angular, console, alert*/

(function () {
  'use strict';
  var app = angular.module('arenastats', ['ui.bootstrap', 'chieffancypants.loadingBar', 'tableSort']);


  app.controller("MainController", function($scope, $http) {

    $scope.serverName = app.serverName;
    $scope.apiLoaded = true;
    $scope.showDetails = false;

    $scope.tabs = {
      tab2 : true,
      tab3 : false,
      tab5 : false
    };

    var processTeams = function (teams) {
      if (!teams) { return; }

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
      processTeams($scope.teams5);
    })
      .error(function(data, status, header, config) {
      console.log("Error in ArenaStats $http.get: " + app.api + "arena_team/type/3");
      $scope.apiLoaded = false;
    });


    $scope.teamDetails = [];

    $scope.showTeamDetails = function (id) {

      $http.get( app.api + "arena_team/id/" + id )
        .success(function(data, status, header, config) {

        if (data.length > 0) {

          $scope.showDetails = true;

          $scope.teamDetails.arenaTeamId     = data[0].arenaTeamId;
          $scope.teamDetails.name            = data[0].name;
          $scope.teamDetails.captainGuid     = data[0].captainGuid;
          $scope.teamDetails.type            = data[0].type;
          $scope.teamDetails.rating          = data[0].rating;
          $scope.teamDetails.seasonGames     = data[0].seasonGames;
          $scope.teamDetails.seasonWins      = data[0].seasonWins;
          $scope.teamDetails.weekGames       = data[0].weekGames;
          $scope.teamDetails.weekWins        = data[0].weekWins;
          $scope.teamDetails.rank            = data[0].rank;
          $scope.teamDetails.backgroundColor = data[0].backgroundColor;
          $scope.teamDetails.emblemStyle     = data[0].emblemStyle;
          $scope.teamDetails.emblemColor     = data[0].emblemColor;
          $scope.teamDetails.borderStyle     = data[0].borderStyle;
          $scope.teamDetails.borderColor     = data[0].borderColor;
          $scope.teamDetails.captainName     = data[0].captainName;

          $scope.teamDetails.members = [];

          $http.get( app.api + "arena_team_member/" + id )
            .success(function(data, status, header, config) {

            data.forEach(function (member) {
              $scope.teamDetails.members.push(member);
            });
          })
            .error(function(data, status, header, config) {
            console.log("Error in ArenaStats $http.get: " + app.api + "arena_team_member/" + id);
          });

        } else {
          console.log("Team " + id + " not found.");
        }
      })
        .error(function(data, status, header, config) {
        console.log("Error in ArenaStats $http.get: " + app.api + "arena_team/id/" + id);
      });

    };
  });

}());
