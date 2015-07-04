var input = ['FOO','BAR'];

Array.prototype.last = function() {
  return this.length > 0 ? this[this.length - 1] : null;
};

angular.module("powerglove",[]).
controller("DataController", function($scope) {
  angular.extend($scope, {
    input:      input,
    commands:   [],
    newCommand: "",
    results:    [],
    isArray:    angular.isArray.bind(angular),
    log:        console.log.bind(console),
    selected:   -1,

    addCommand: function(cmd) {
      var $map = null, result, list = $scope.results.last() || input;

      with (R) result = eval(cmd)(list);

      if (cmd.match(/^filter\(/)) {
        var i = 0;
        with (R) $map = eval(cmd.replace(/^filter\(/, "map("))(list);

        result.$map = $map.map(function(val, i) {
          return !val ? false : (list.$map ? list.$map[i] : i);
        }).filter(function(val) {
          return val !== false;
        });
      }

      if (cmd.match(/^sortBy/)) {
        result.$map = result.map(function(i) { return list.indexOf(i); });
      }

      if (result && !result.$map && list && list.$map) {
        result.$map = list.$map;
      }

      $scope.commands.push(cmd);
      $scope.results.push(result);

      if (cmd === $scope.newCommand) {
        $scope.newCommand = "";
      }
    },

    removeCommand: function($index) {
      $scope.newCommand = $scope.commands.splice($index, 1)[0];
      $scope.results.splice($index);
      $scope.commands.splice($index).map(function(cmd) { $scope.addCommand(cmd); });
    },

    select: function(list, $index) {
      $index = list.$map ? list.$map[$index] : $index;
      $scope.selected = ($scope.selected === $index) ? -1 : $index;
    },

    isActive: function(i, j) {
      var list = $scope.results[i];
      return list && list.$map ? list.$map[j] === $scope.selected : j === $scope.selected;
    },

    display: function(i, j) {
      return $scope.results[i][j];
    },

    typeOf: function(val) {
      return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }
  });

/*
  $scope.addCommand("sortBy(pipe(prop('created_at'), Date.parse))");
  $scope.addCommand("groupBy(prop('type'))");
  $scope.addCommand("mapObj(pipe(head, path(['repo', 'name'])))");
*/

	$scope.addCommand("map(toLower)");

  // $scope.addCommand("groupBy(prop(\"type\"))");

  // $scope.addCommand("map(path(['repo', 'name']))");
  // $scope.addCommand("filter(match(/router/))");

  // $scope.addCommand("map(toLower)");
  // $scope.addCommand("map(nthCharCode(0))");
  // $scope.addCommand("filter(either(lt(__, 100), gt(__, 110)))");
  // $scope.addCommand("map(add(5))");
  // $scope.addCommand("map(String.fromCharCode)");
  // $scope.addCommand("filter(complement(eq('t')))");
  // $scope.addCommand("map(concat(__, '!'))");
  // $scope.addCommand("map(toUpper)");
});
