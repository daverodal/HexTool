import TerrainType from "../models/terrain-type";
import Terrain from "../models/terrain";
 import ImageView from  "../views/image-view";
import HexPick from "../mixins/hex-pick";
    export default ImageView.extend({

        click: function (e) {
            debugger;
        var offset = this.$().offset();
        var border = this.$(".tutWrapper").css('border-width');
        border = border.replace(/px/, "");
        var x = e.pageX - offset.left - border;
        var y = e.pageY - offset.top - border;
        this.get('controller').myInit(this.get('controller.model'));
        this.get('controller').setPixels(x, y);

        var x = this.get('controller.x');
        var y = this.get('controller.y');
        var myCon = this.get('controller');
        myCon.setHexpartXY(x, y);

        var px = myCon.getPixelX()+3 +"px";
        var py = myCon.getPixelY()+"px";
        var hexpartType = myCon.getHexpartType();
        var hexNumber = myCon.get('number');
        var name = hexNumber+"x"+hexpartType;
        var myObj = myCon.get('hexData').findBy('name',name);
        var curColor = this.get('controller.selectedColor');

        if(myObj){
            var curTerrain = myObj.type.findBy('name',curColor);
            if(curTerrain){
                myObj.get('type').removeObject(curTerrain);
//          if(!myObj.get('type')){
//            myCon.get('hexData').removeObject(myObj);
//          }
            }else{
                var newTerrain = TerrainType.create({name:curColor});
                myObj.get('type').pushObject(newTerrain);
            }
//        myCon.get('hexData').removeObject(myObj);

        }else{

            var newTerrainType = TerrainType.create({name:curColor});
            var type = Ember.A();
            type.pushObject(newTerrainType);
            var newTerrain = Terrain.create({type:type,name:name,number:hexNumber,x:px, y:py,hexpartType:hexpartType})

//        var type = this.get('controller.selectedColor').replace(/[a-z]/g,'');
//      myCon.get('hexData').pushObject({type:type,name:name,number:hexNumber,x:px, y:py, style:'top:'+py+';left:'+px,hexpartType:hexpartType});
            myCon.get('hexData').pushObject(newTerrain);
        }
//      $("#terrainWrapper").append("<div class='terrain' style='top:"+py+";left:"+px+";'>L</div>")


    },
    templateName: "ImageView",
    didInsertElement: function () {
        this._super();
        var str = this.get('controller.model.hexes');
        var arr = JSON.parse(str);
        var hexes = Ember.A();
        if(arr){
            for(var i = 0;i < arr.length;i++){
                var ter = Terrain.create(arr[i]);
                ter.set('controller',this.get('controller'));
                hexes.pushObject(ter);
            }
        }
        this.set('controller.hexData',hexes);
    }
});
