var alarmCallbacks = []

module.exports = {
  addAlarmListener: function addAlarmListener(callback) {
    alarmCallbacks.push(callback)
  },

  dispatchAlarm: function dispatchAlarm(alarm) {
    alarmCallbacks.forEach((callback) => callback(alarm))
  }
}
