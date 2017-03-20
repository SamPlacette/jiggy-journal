const userData = require('../user-data')
const journalEntryData = require('../journal-entry-data')

module.exports = {
  html: require('./index.html'),
  css: require('./index.css'),
  controller: function JournalEntriesController($scope, $routeParams) {
    
    userData.getUser()
    .then((user) => journalEntryData.getList(user))
    .then((entries) => {
      $scope.entries = entries
      $scope.$digest()
    })
  }
}
