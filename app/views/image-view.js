export default Ember.View.extend({
  templateName: "image-view",
  myControllerBinding: 'controller.controllers.map',
  didInsertElement: function () {

    var that = this;
    $(".mapImage").load(function () {
      var imgWidth = $("img").width();
      var imgHeight = $("img").height();
      $("canvas").attr({width: imgWidth, height: imgHeight});
      that.get('myController').changeLeft();
      that.get('myController').changeTop();
      that.get('myController').doDraw(that.get('myController.numX'), that.get('myController.numY'));
    });

    this.get('myController').changeLeft();
    this.get('myController').changeTop();
    this.get('myController').doDraw(this.get('myController.numX'), this.get('myController.numY'));
  }
});

