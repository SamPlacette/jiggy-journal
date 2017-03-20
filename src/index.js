const angular = require('angular')
const ngRoute = require('angular-route')
const firebase = require('firebase')
const firebaseui = require('firebaseui')
require('firebaseui/dist/firebaseui.css')
require('materialize-css/dist/css/materialize.css')

const timeutils = require('./timeutils')
const journalEntries = require('./journal-entries')
const editJournalEntry = require('./edit-journal-entry')
const accountPage = require('./account-page')
const userData = require('./user-data')
const alarmService = require('./alarm-service')

require('./index.css')

angular.module('jiggyJournal', ['ngRoute'])

.config(function configureFirebase() {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
  })
})

.controller('MainController', function MainController($scope, $timeout, $location) {
  $scope.timeutils = timeutils

  $scope.alarms = []
  alarmService.addAlarmListener((alarm) => {
    $scope.alarms.push(alarm)
    
    $timeout(() => {
      $scope.alarms = $scope.alarms.filter((item) => item !== alarm)
    }, 3000)

    $scope.$digest()
  })

  $scope.isEntriesNavActive = () => {
    return $location.path().indexOf('entries') !== -1
  }
  $scope.isAccountNavActive = () => {
    $location.path().indexOf('account') !== -1
  }

  userData.getUser().then((user) => {
    $scope.user = user
    $scope.needsLogin = false
    $scope.$digest()
  })

  userData.getAuthStatus().then((loggedIn) => {
    if (loggedIn) { return }
    $scope.needsLogin = true
    $scope.$digest()

    var firebaseWidget = new firebaseui.auth.AuthUI(firebase.auth())
    firebaseWidget.start('#firebase-login-widget', {
      callbacks: {
        signInSuccess: function onAuthenticated(user) {
          $scope.user = user
          $scope.digest()
          return false
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    })
  })
})

.config(function configureRouter($routeProvider, $locationProvider) {
  $routeProvider
  .when('/entries', {
    template: journalEntries.html,
    controller: journalEntries.controller
  })
  .when('/entries/:entry', {
    template: editJournalEntry.html,
    controller: editJournalEntry.controller
  })
  .when('/account', {
    template: accountPage.html,
    controller: accountPage.controller
  })
  .otherwise({ redirectTo: '/entries' })

  $locationProvider.hashPrefix('')
  $locationProvider.html5Mode({ enabled: false, rewriteLinks: false })
})
