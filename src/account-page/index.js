const userData = require('../user-data')
const alarmService = require('../alarm-service')

module.exports = {
  html: require('./index.html'),
  css: require('./index.css'),
  controller: function AccountPageController($scope, $routeParams) {
    $scope.logout = function logout() {
      userData.logout()
      .then(() => {
        alarmService.dispatchAlarm({ message: 'Logged out.' })
        window.location = '#/entries'
        window.location.reload()
      })
    }
  }
}

