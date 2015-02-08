import Ember from "ember";
import HexPick from "../../mixins/hex-pick";
import DrawMixin from "../../mixins/draw";
import HexPart from "../../mixins/hex-part";
import TerrainProperties from "../../models/terrain-properties";

export default Ember.ObjectController.extend(DrawMixin, HexPick, HexPart, {
    terrainProperties: function () {
      var arr = Ember.A();
      for (var i in TerrainProperties) {
        if (TerrainProperties.hasOwnProperty(i)) {
          var obj = Object.create(TerrainProperties[i]);
          obj.key = i;
          arr.pushObject(obj);
        }
      }
      return arr;
    }.property(),
    needs: 'map',
    hexData: Ember.A(),
    showData: true,
    showOne: false,
    actions: {
      save: function () {
        var that = this;
        var model = this.get('model');
        var hexData = this.get('hexData');
        var len = hexData.length;
        var id = model.get('id');
        for (var i = 0; i < len; i++) {
          hexData.objectAt(i).set('controller', false);
        }
        model.get('hexStr').then(function (myHex) {
          myHex.set('hexEncodedStr', hexData);
          myHex.get('map').then(function () {
            myHex.save().then(function () {
              that.transitionToRoute('map', id);
            }, function () {
              that.transitionTo('login');
            });
          });
        });
      },
      kill: function () {
        this.set('hexData', Ember.A());
      }
    },
    colors: [ "Town", "Hill", "Trail", "River", "Swamp", "Forest", "Roughone", "Roughtwo", "Mountain", "Road", "Secondaryroad", "Sunkenroad", "Elevation","Elevation2", "Redoubt","Redoubtfront", "Wadi", "Slope", "ReinforceZoneA", "ReinforceZoneB", "ReinforceZoneC", "ReinforceZoneD", "ReinforceZoneE", "ReinforceZoneF", "ReinforceZoneG", "Blocked", "BlocksNonRoad", "SpecialHexA", "SpecialHexB", "SpecialHexC", "SpecialHexD", "SpecialHexE", "Mine", "Minedroad", "FortA", "FortB"],
    selectedColor: "Town"
  }
);