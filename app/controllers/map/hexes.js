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
                var hexStr = model.get('hexStr').then(function(myHex){
                    myHex.set('hexEncodedStr',hexData);
                    myHex.save();
                });
                var id = model.get('id');
                model.save().then(function(model){
                        that.transitionToRoute('map',id);
                },function(){
                    alert("Please Login");
                    window.location = "/";
                });
            },
            kill:function(){
                this.set('hexData',Ember.A());
            }
        },
//  colors: function(){
//    var ret = [];
//    debugger;
//    return Ember.keys(App.TerrainProperties);
//  }.property(),
        colors: [ "Town","Trail", "River", "Swamp", "Forest","Roughone","Roughtwo","Mountain","Road","Secondaryroad", "Sunkenroad","Redoubt", "Wadi", "ReinforceZoneA","ReinforceZoneB","ReinforceZoneC", "Blocked","BlocksNonRoad","SpecialHexA","SpecialHexB","SpecialHexC","Mine","Minedroad","FortA","FortB"],
        selectedColor:"Town"
//    selectedLabel:function(){
//      var col = this.get('selectedColor');
//      var color = "black";
//      switch(col){
//        case 'Town':
//          color = 'black';
//          break;
//        case "River":
//          color = 'blue';
//          break;
//        case "Forest":
//          color = "green";
//          break;
//        case "Mountain":
//          color = "brown";
//          break;
//        case "rOad":
//          color = "red";
//          break;
//      }
//      return "<span style='color:"+color+"'>"+col.replace(/[a-z]/g,'')+"</span>";
//    }.property('selectedColor')
    }

);