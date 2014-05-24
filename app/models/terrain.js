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
    number:null,
    label:function(){
        var all = this.get('controller.showOne');
        var col = this.get('type');
        var ret = "";
        for(var i = 0;i < col.length;i++){
            var color = "black";
            var c;
            c = col[i].get('name');
            if(all && c !== this.get('controller.selectedColor')){
                continue;
            }
            var disp = "X";
            var prop = TerrainProperties.get(c);
            if(prop){
                color = prop.color;
                disp = prop.disp;
            }
//    switch(c){
//      case 'Blocked':
//        color = 'RED';
//        disp = "B"
//        break;
//      case 'Town':
//        color = 'black';
//        disp = "T"
//        break;
//      case "River":
//        color = 'blue';
//        disp = "R"
//        break;
//      case "Forest":
//        color = "green";
//        disp = "F"
//        break;
//      case "Swamp":
//        color = "green";
//        disp = "S"
//        break;
//      case "Mountain":
//        color = "brown";
//        disp = "M";
//        break;
//      case "Roughone":
//        color = "brown";
//        disp = "R";
//        break;
//      case "Roughtwo":
//        color = "black";
//        disp = "R";
//        break;
//      case "Road":
//        color = "red";
//        disp = "O";
//        break;
//      case "Mine":
//        color = "red";
//        disp = "M";
//        break;
//      case "Minedroad":
//        color = "purple";
//        disp = "O";
//        break;
//      case "FortA":
//        color = "blue";
//        disp = "F";
//        break;
//      case "FortB":
//        color = "red";
//        disp = "F";
//        break;
//      case "Sunkenroad":
//        color = "purple";
//        disp = "O";
//        break;
//      case "Trail":
//        color = "brown";
//        disp = "O";
//        break;
//      case "Redoubt":
//        color = "purple";
//        disp = "B";
//        break;
//      case "SpecialHexA":
//        color = "green";
//        disp = "A";
//        break;
//      case "SpecialHexB":
//        color = "green";
//        disp = "B";
//        break;
//      case "SpecialHexC":
//        color = "green";
//        disp = "C";
//        break;
//      case "Wadi":
//        color = "black";
//        disp = "W";
//        break;
//      case "ReinforceZoneA":
//        color = "black";
//        disp = "A";
//        break;
//      case "ReinforceZoneB":
//        color = "black";
//        disp = "B";
//        break;
//      case "BlocksNonRoad":
//        color = "blue";
//        disp = "B";
//        break;
//      case "ReinforceZoneC":
//        color = "black";
//        disp = "C";
//        break;
//    }

            ret +=  "<span style='color:"+color+"'>"+disp+"</span>";
        }
        return ret;
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
