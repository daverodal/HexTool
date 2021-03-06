import Ember from "ember";
import HexPick from "../../mixins/hex-pick";

export default Ember.ObjectController.extend(HexPick, {
  actions: {
    update: function () {
      var that = this;
      that.set('updating',true);
      $.ajax({
        url: this.get('pubUrl')
      }).then(function (arg, arg2, arg3) {
        that.set('updating', false);
        if(arg.ok !== true){
          alert(arg);
        }
        that.set('success', true);
        setTimeout(function(){
          that.set('success', false);
        }, 5000);
      },function () {
        that.set('updating', false);
        that.set('error', true);
        setTimeout(function(){
          that.set('error', false);
        }, 5000);
      });
    },
    clone: function(){
      var that = this;
      $.ajax({
        url: this.get('cloneUrl')
      }).then(function () {
        window.location = HexToolENV.mapsUrl;
        //that.set('cloned', true);
        //setTimeout(function(){
        //  that.set('cloned', false);
        //}, 5000);
      },function () {
        that.set('error', true);
        setTimeout(function(){
          that.set('error', false);
        }, 5000);
      });
    }
  },
  updating: false,
  error: false,
  success: false,
  needs: 'map',
  originY: function () {
    var trueRows = this.get('trueRows');
    //if(trueRows){
    //  var a = this.get('a');
    //  var c = this.get('c');
    //  var yOff = (a + c) * 2 - (c / 2 + a);
    //  return yOff - this.get('y');
    //}

    var b = this.get('b');
    return b * 3 - this.get('y');
  }.property('b', 'y'),
  originX: function () {
    var trueRows = this.get('trueRows');
    //if(trueRows){
    //  var b = this.get('b');
    //  return b * 3 - this.get('y');
    //}
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
  cloneUrl: function(){
    var id = this.get('id');
    if (id) {
      return HexToolENV.cloneUrl + '/' + this.get('id');
    }
    return '';
  }.property('hexId'),
  hexId: false,
  getHexId: function () {
    var that = this;
    this.get('hexStr').then(function (hexStr) {
      that.set('hexId', hexStr.get('id'));
    });
  }.observes('hexStr')
});
