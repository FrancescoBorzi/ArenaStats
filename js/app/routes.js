/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';
  var app = angular.module('arenastats');

  // routing
  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
    .state('home', {
      url: '/home',
      controller: 'HomeController',
      templateUrl: 'partials/home.html'
    });


  });

}());
