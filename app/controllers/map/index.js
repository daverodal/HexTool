import Ember from "ember";
import HexPick from "../../mixins/hex-pick";

export default Ember.ObjectController.extend(HexPick,{
    needs: 'map',
    originY:function(){
        var b = this.get('b');
        return b * 3 - this.get('y');
    }.property('b','y'),
    originX: function(){
        var a = this.get('a');
        var c = this.get('c');
        var xOff = (a + c) * 2 - (c/2 + a);
        return xOff - this.get('x');
    }.property('a','c','y')
});
