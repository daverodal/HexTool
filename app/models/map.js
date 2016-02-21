import DS from "ember-data";
export default DS.Model.extend({
  hexStr:DS.belongsTo('hexStr', {async: true}),
  mapUrl: DS.attr('string'),
  myAttr: DS.attr('string'),
  mapWidth: DS.attr('string'),
  mapHeight: DS.attr('number'),
  numX: DS.attr('number'),
  numY: DS.attr('number'),
  x: DS.attr('number'),
  y: DS.attr('number'),
  a: DS.attr('number'),
  b: DS.attr('number'),
  c: DS.attr('number'),
  hexSize: DS.attr('number'),
  perfectHexes: DS.attr('boolean'),
  gameName:DS.attr('string'),
  scenarioName:DS.attr('string'),
  hexes: DS.attr('string'),
  isDefault: DS.attr('boolean', {defaultValue: true}),
  trueRows: DS.attr('boolean',{defaultValue: false}),
  thoseThings: DS.attr('thoseThings'),
  mapWidthStyle: function(){
    var trail = '';
    if(this.get('mapWidth').match(/\d/)){
      trail = 'px';
    }
    return "width:"+this.get('mapWidth')+trail;
  }.property('mapWidth')
});
