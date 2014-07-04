import Ember from "ember";
import HexPick from "../../mixins/hex-pick";

export default Ember.ObjectController.extend(HexPick, {
  actions: {
    update: function () {
      var that = this;
      $.ajax({
        url: this.get('pubUrl')
      }).then(function () {
        that.set('success', true);
        setTimeout(function(){
          that.set('success', false);
        }, 5000);
      },function () {
        that.set('error', true);
        setTimeout(function(){
          that.set('error', false);
        }, 5000);
      });
    }
  },
  error: false,
  success: false,
  needs: 'map',
  originY: function () {
    var b = this.get('b');
    return b * 3 - this.get('y');
  }.property('b', 'y'),
  originX: function () {
    var a = this.get('a');
    var c = this.get('c');
    var xOff = (a + c) * 2 - (c / 2 + a);
    return xOff - this.get('x');
  }.property('a', 'c', 'y'),
  pubUrl: function () {
    var scenario = this.get('scenarioName');
    var gameName = this.get('gameName');
    var id = this.get('id');
    if (scenario && gameName && id) {
      return HexToolENV.pubUrl + '/' + gameName + '/' + scenario + '/' + this.get('hexId');
    }
    return '';
  }.property('hexId', 'scenarioName', 'gameName'),
  hexId: false,
  getHexId: function () {
    var that = this;
    this.get('hexStr').then(function (hexStr) {
      that.set('hexId', hexStr.get('id'));
    });
  }.observes('hexStr')
});
