const moment = require('moment')

module.exports = {
  formatIso: function formatIso(date) {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss')
  },

  formatReadable: function formatReadable(date) {
    return moment(date).format('LLL')
  },

  formatDifferenceReadable: function formatDifferenceReadable(then, now) {
    if (!now) { now = new Date() }
    return moment(now).to(then)
  }
}
