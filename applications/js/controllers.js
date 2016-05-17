(function() {
  console.log('controllers')
  angular
    .module('applicationsApp')
    .controller('home.controller', function($scope) {
      console.log('home.controller')

      $scope.params = {
        page: 0,
        num_per_page: 100
      }

      var load_school_preview = function() {
        $scope.params['school_list'] = school_preview($scope.params['page'], $scope.params['num_per_page'])
      }
      load_school_preview()

      $scope.previous_page = function() {
        $scope.params['page'] -= 1
        load_school_preview()
      }

      $scope.next_page = function() {
        $scope.params['page'] += 1
        load_school_preview()
      }

    })

    .controller('school.controller', function($scope, $routeParams) {
      console.log('school.controller')
      console.log($routeParams)
    })
})()
