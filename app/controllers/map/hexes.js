import HexPick from "../../mixins/hex-pick";
import DrawMixin from "../../mixins/draw";
import HexPart from "../../mixins/hex-part";

export default Ember.ObjectController.extend(DrawMixin, HexPick,   HexPart,  {
        needs: 'map',
        hexData:Ember.A(),
        showData:true,
        showOne:false,
        actions:{
            save:function(){
                var that = this;
                var model = this.get('model');
                var hexData = this.get('hexData');
                var len = hexData.length;
                for(var i = 0;i< len;i++){
                    hexData.objectAt(i).set('controller',false);
                }
                model.get('hexStr').then(function(myHex){
                    myHex.set('hexEncodedStr',hexData);
                    myHex.save();
                });
                var id = model.get('id');
                model.save().then(function(){
                        that.transitionToRoute('map',id);
                },function(){
                    that.transitionTo('login');
                });
            },
            kill:function(){
                this.set('hexData',Ember.A());
            }
        },
        colors: [ "Town","Trail", "River", "Swamp", "Forest","Roughone","Roughtwo","Mountain","Road","Secondaryroad", "Sunkenroad","Redoubt", "Wadi", "ReinforceZoneA","ReinforceZoneB","ReinforceZoneC", "Blocked","BlocksNonRoad","SpecialHexA","SpecialHexB","SpecialHexC","Mine","Minedroad","FortA","FortB"],
        selectedColor:"Town"
    }

);