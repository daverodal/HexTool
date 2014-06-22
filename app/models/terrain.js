import Ember from "ember";
import TerrainType from "../models/terrain-type";
import TerrainProperties from "../models/terrain-properties";
export default Ember.Object.extend({
    init:function(){
        this._super();
        var a = Ember.A();
        var type=this.get('type');
        for(var i = 0;i< type.length;i++)
        {
            a.pushObject(TerrainType.create(type[i]));
        }
        this.set('type',a);
    },
    type:Ember.A(),
    name:null,
    color:null,
    number:null,
    label:function(){
        var all = this.get('controller.showOne');
        var col = this.get('type');
        var arr = [];
        for(var i = 0;i < col.length;i++){
            var c;
            c = col[i].get('name');
            if(all && c !== this.get('controller.selectedColor')){
                continue;
            }
            var prop = TerrainProperties.get(c);
            if(prop){
                arr.push(prop);
            }
        }
        return arr;
    }.property('type.@each','controller.selectedColor','controller.showOne'),
    code:function(){
        var col = this.get('type');
        var ret = "";
        for(var i = 0;i < col.length;i++){
            var c;
            c = col[i].get('name');
            if(c === "SpecialHexA"){
                ret += "$specialHexA[] = "+this.get('number')+";<br>";
            }else  if(c === "SpecialHexB"){
                ret += "$specialHexB[] = "+this.get('number')+";<br>";
            }else  if(c === "SpecialHexC"){
                ret += "$specialHexC[] = "+this.get('number')+";<br>";
            }else  if(c === "ReinforceZoneA"){
                ret += "$this->terrain->addReinforceZone("+this.get('number')+",'A');<br>";
            }else       if(c === "ReinforceZoneB"){
                ret += "$this->terrain->addReinforceZone("+this.get('number')+",'B');<br>";
            }else       if(c === "ReinforceZoneC"){
                ret += "$this->terrain->addReinforceZone("+this.get('number')+",'C');<br>";
            }else{
                ret += "$this->terrain->addTerrain("+this.get('number')+" ,"+this.get('hexpartType')+" , \""+ c.toLowerCase()+"\");<br>";
            }
        }
        return ret;
    }.property('type.@each'),
    x:null,
    y:null,
    style:function(){
        return 'top:'+this.get('y')+';left:'+this.get('x');
    }.property('x','y'),
    hexpartType:null
});
