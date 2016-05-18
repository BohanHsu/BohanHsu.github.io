(function() {
  angular
    .module('applicationsApp')
    .controller('home.controller', function($scope, $rootScope) {
      console.log('home.controller')

      $scope.params = {
        num_per_page: 10
      }

      if (!('params' in $rootScope)) {
        $rootScope.params = {
          page: 0
        }
      }

      if (!('page' in $rootScope.params)) {
        $rootScope.params['page'] = 0
      }

      $scope.params['school_nums'] = schools_nums()

      var load_school_preview = function() {
        $scope.params['school_list'] = school_preview($rootScope.params['page'], $scope.params['num_per_page'])
      }
      load_school_preview()

      $scope.previous_page = function() {
        if ($rootScope.params['page'] > 0) {
          $rootScope.params['page'] -= 1
          load_school_preview()
        }
      }

      $scope.next_page = function() {
        if ($scope.params['school_nums'] / $scope.params['num_per_page'] >= $rootScope.params['page'] + 1) {
          $rootScope.params['page'] += 1
          load_school_preview()
        }
      }
    })

    .controller('school.controller', function($scope, $routeParams) {
      $scope.params = {}
      $scope.params['school_id'] = $routeParams['id']
      $scope.params['school_info'] = school_info($routeParams['id'])

      $scope.program_preview = []
      $scope.params['school_info']['programs'].forEach(function(ele, idx, arr) {
        $scope.program_preview.push({
          'name': ele['Major'],
          'id': idx
        })
      })

      var school_detail = {}
      get_school_attrs().forEach(function(ele, idx, arr) {
        if (ele in $scope.params['school_info'] && $scope.params['school_info'][ele].length != 0) {
          school_detail[ele] = $scope.params['school_info'][ele]
        }
      })

      $scope.params['school_detail'] = school_detail
      $scope.params['school_attrs'] = get_school_attrs()
      $scope.params['school_attr_display'] = get_school_attr_display()
      $scope.is_hyper_link = is_hyper_link
    })

    //.controller('program.controller', function($scope, $routeParams) {
    //})
})()
