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
        .when('/detail/:id', {
          templateUrl: './detail.view.html',
          controller: 'detail.controller'
        })
        .otherwise('/home')
    })
})()
