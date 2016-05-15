(function() {
  console.log('controllers')
  angular
    .module('applicationsApp')
    .controller('home.controller', function($scope) {
      console.log('home.controller')
    })

    .controller('detail.controller', function($scope, $routeParams) {
      console.log('detail.controller')
      console.log($routeParams)
    })
})()
