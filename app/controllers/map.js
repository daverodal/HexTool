import DrawMixin from "../mixins/draw";
import HexPick from "../mixins/hex-pick";
import Ember from "ember";

var SIN = Math.sin(Math.PI / 3);

export default Ember.ObjectController.extend(DrawMixin, HexPick, {
  needs: 'map',
  disabled: "false",
  imageWidth: 3,
  imageHeight: 4,
  myA: null,


  changeLeft: function () {
    Ember.$('canvas').css("left", this.get('x') + "px");
  }.observes("x"),
  changeTop: function () {
    Ember.$('canvas').css("top", this.get('y') + "px");
  }.observes("y"),
  doSomethingElse: function () {
    if(!this.get('perfectHexes')){
      return;
    }
    var hexside = this.get('hexSize');
    this.set("c", hexside);
    this.set("a", hexside / 2);
    this.set("b", hexside * SIN);

    this.set('perfect', true);
  }.observes('hexSize'),
  calcPerfect:function(){
    if(this.get('perfectHexes')){
      var c = this.get('c');
      this.set('hexSize',0);
      this.set('hexSize',c);
    }
  }.observes('perfectHexes'),
  doSomething: function () {

    Ember.run.once(this, 'justOneTime');
  }.observes('c', 'a', 'b', 'numX', 'numY','trueRows'),
  justOneTime: function () {
    this.doDraw(this.get('numX'), this.get('numY'));
  }
});