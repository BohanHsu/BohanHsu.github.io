(function() {
  angular
    .module('applicationsApp')
    .controller('home.controller', function($scope, $rootScope) {

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

    .controller('program.controller', function($scope, $routeParams) {
      $scope.params = {}
      $scope.params['school_id'] = $routeParams['school_id']
      $scope.params['program_id'] = $routeParams['program_id']

      $scope.params['school_info'] = school_info($scope.params['school_id'])

      $scope.params['program_info'] = program_info($scope.params['school_id'], $scope.params['program_id'])
      $scope.params['program_attrs'] = get_program_attrs()
      $scope.params['program_attr_display'] = get_program_attr_display()

      $scope.is_multi_value_attr = is_multi_value_attr
      $scope.is_hyper_link = is_hyper_link

      function cook_program_info() {
        // [val, is_hyper, attr,  rowspan]

        var cooked_program_info = []
        $scope.params['program_attrs'].forEach(function(attr, idx, arr) {
          if (is_multi_value_attr(attr)) {
            $scope.params['program_info'][attr].forEach(function(val, idx1, arr1) {
              if (idx1 == 0) {
                cooked_program_info.push([val, false, $scope.params['program_attr_display'][attr], arr1.length])
              } else {
                cooked_program_info.push([val, false])
              }
            })
          } else {
            cooked_program_info.push([$scope.params['program_info'][attr], is_hyper_link(attr), $scope.params['program_attr_display'][attr]])
          }
        })

        $scope.params['cooked_program_info'] = cooked_program_info
      }
      cook_program_info()

    })
})()
