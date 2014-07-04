import Ember from 'ember';
import TerrainType from "../models/terrain-type";
import Terrain from "../models/terrain";
import ImageView from "../views/image-view";
export default ImageView.extend({
    templateName: "ImageView",
    isLoading: false,

    click: function (e) {
        var offset = this.$().offset();
        var border = this.$(".tutWrapper").css('border-width');
        border = border.replace(/px/, "");
        var x = e.pageX - offset.left - border;
        var y = e.pageY - offset.top - border;
        this.get('controller').myInit(this.get('controller.model'));
        this.get('controller').setPixels(x, y);

        x = this.get('controller.x');
        y = this.get('controller.y');
        var myCon = this.get('controller');
        myCon.setHexpartXY(x, y);

        var px = myCon.getPixelX() + 3 + "px";
        var py = myCon.getPixelY() + "px";
        var hexpartType = myCon.getHexpartType();
        var hexNumber = myCon.get('number');
        var name = hexNumber + "x" + hexpartType;
        var myObj = myCon.get('hexData').findBy('name', name);
        var curColor = this.get('controller.selectedColor');

        var newTerrain;
        if (myObj) {
            var curTerrain = myObj.type.findBy('name', curColor);
            if (curTerrain) {
                myObj.get('type').removeObject(curTerrain);
            } else {
                newTerrain = TerrainType.create({name: curColor});
                myObj.get('type').pushObject(newTerrain);
            }
        } else {

            var newTerrainType = TerrainType.create({name: curColor});
            var type = Ember.A();
            type.pushObject(newTerrainType);
            newTerrain = Terrain.create({type: type, name: name, number: hexNumber, x: px, y: py, hexpartType: hexpartType});

            myCon.get('hexData').pushObject(newTerrain);
        }
    },
    didInsertElement: function () {
        this.set('isLoading',true);
      var doShow = this.get('controller.showData');
      this.set('controller.showData', false);
        this._super();
//        var str = this.get('controller.model.hexes');
        var hhStr = this.get('controller.model.hexStr');
        var that = this;
        hhStr.then(function(hexStr){
            var arr = hexStr.get('hexEncodedStr');
            var hexes = Ember.A();
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var ter = Terrain.create(arr[i]);
                    ter.set('controller', that.get('controller'));
                    hexes.pushObject(ter);
                }
            }
            that.set('controller.hexData', hexes);
            that.set('isLoading',false);
            that.set('controller.showData', doShow);
        });
     }
});
