const firebase = require('firebase')

module.exports = {

  getUser: function getUser() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) { resolve(user) }
      })
    })
  },

  /**
   * @return {Promise<boolean>} - resolves with `true` if user is logged in,
   * else resolves with `false`
   */
  getAuthStatus: function getAuthStatus() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        resolve(!!user)
      })
    })
  },

  logout: function logout() {
    return firebase.auth().signOut()
  }
}
