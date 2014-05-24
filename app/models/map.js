export default DS.Model.extend({
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
  hexes: DS.attr('string')
});
