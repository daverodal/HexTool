import DS from "ember-data";
export default DS.RESTAdapter.extend({
    host: HexToolENV.adapterURL
});
