import DS from "ember-data";
export default DS.Model.extend({
    hexEncodedStr:DS.attr('hexStr'),
    map:DS.belongsTo('map', {async: true})
});
