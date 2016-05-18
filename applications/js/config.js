(function() {
  console.log('config')
  angular
    .module('applicationsApp')
    .config(function($routeProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: './home.view.html',
          controller: 'home.controller'
        })
        .when('/school/:id', {
          templateUrl: './school.view.html',
          controller: 'school.controller'
        })
        .when('/program/:school_id/:program_id', {
          templateUrl: './program.view.html',
          controller: 'program.controller'
        })
        .otherwise('/home')
    })
})()
