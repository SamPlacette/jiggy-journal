const timeutils = require('../timeutils')
const userData = require('../user-data')
const journalEntryData = require('../journal-entry-data')
const alarmService = require('../alarm-service')

module.exports = {
  html: require('./index.html'),
  css: require('./index.css'),
  controller: function EditJournalEntryController($scope, $routeParams) {
    if ($routeParams.entry === 'new') {
      $scope.entry = {
        time: timeutils.formatIso(new Date()),
        value: ''
      }
    } else {
      userData.getUser()
      .then((user) => journalEntryData.getItem(user, $routeParams.entry))
      .then((entry) => {
        $scope.entry = entry
        $scope.$digest()
      })
    }

    $scope.save = function save() {
      if (!$scope.entry.value) { return }
      $scope.entry.edited = timeutils.formatIso(new Date())
      journalEntryData.saveItem($scope.user, $scope.entry)
      .then((item) => {
        alarmService.dispatchAlarm({ message: 'Entry saved.' })
        window.location = '#/entries/' + item.time
      })
    }

    $scope.startDelete = () => $scope.deleting = true

    $scope.cancelDelete = () => $scope.deleting = false

    $scope.confirmDelete = function confirmDelete() {
      journalEntryData.deleteItem($scope.user, $scope.entry)
      .then((item) => {
        alarmService.dispatchAlarm({ message: 'Entry deleted.' })
        window.location = '#/entries'
      })
    }
  }
}
