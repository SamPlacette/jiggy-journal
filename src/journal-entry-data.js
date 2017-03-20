const firebase = require('firebase')

module.exports = {

  getList: function getList(user) {
    if (!user) {
      return Promise.reject(new Error('user is required'))
    }

    return new Promise((resolve, reject) => {
      firebase.database().ref().child(user.uid + '/entries')
      .on('value', function updateValue(snapshot) {
        var data = snapshot.val()
        if (data) {
          resolve(Object.values(data).sort((item) => item.time).reverse())
        } else { resolve([]) }
      })
    })
  },

  getItem: function getItem(user, key) {
    if (!user) {
      return Promise.reject(new Error('user is required'))
    }
    if (!key) {
      return Promise.reject(new Error('key is required'))
    }

    return new Promise((resolve, reject) => {
      firebase.database().ref().child(user.uid + '/entries/' + key)
      .on('value', function updateValue(snapshot) {
        resolve(snapshot.exportVal() || [])
      })
    })
  },

  saveItem: function saveItem(user, item) {
    if (!user) {
      return Promise.reject(new Error('user is required'))
    }
    if (!item) {
      return Promise.reject(new Error('item is required'))
    }

    return new Promise((resolve, reject) => {
      firebase.database().ref().child(user.uid + '/entries/' + item.time)
      .set(item, function updateValue(snapshot) {
        resolve(item)
      })
    })
  },

  deleteItem: function deleteItem(user, item) {
    if (!user) {
      return Promise.reject(new Error('user is required'))
    }
    if (!item) {
      return Promise.reject(new Error('item is required'))
    }

    return new Promise((resolve, reject) => {
      firebase.database().ref().child(user.uid + '/entries/' + item.time)
      .set(null, function updateValue(snapshot) {
        resolve(item)
      })
    })
  }

}
