import HexPart from "../mixins/hex-part";
export default Ember.Mixin.create({
    originX:false,
    originY:false,
    topHeight:false,
    bottomHeight:false,
    hexsideWidth:false,
    centerWidth:false,
    hexagonWidth:false,
    hexagonHeight:false,
    halfHexagonHeight:false,
    halfHexagonWidth:false,
    oneFourthHexagonHeight:false,
    leftMapEdge:false,

    // pixel info from screen
    mapGridX:false,
    mapGridY: false,
    distanceFromLeftEdgeOfHexagon:false,
    distanceFromTopEdgeOfHexagon:false,
    column:false,
    row:false,
    number: false,

    // hexagon and it's hexpart
    hexagon:false,
    hexpart:false,

    myInit:function(mapData)
    {
        var b = mapData.get('b');
        var a = mapData.get('a');
        var c =  mapData.get('c');

        var xOff = (a + c) * 2 - (c/2 + a);
        this.set('originX', xOff - mapData.get('x') );
        this.set('originY', 3 * b -  mapData.get('y'));
        this.set('topHeight', mapData.get('b'));
        this.set('bottomHeight', mapData.get('b'));
        this.set('hexsideWidth', mapData.get('a'));
        this.set('centerWidth', mapData.get('c'));

        this.set('hexagonHeight', this.get('topHeight') + this.get('bottomHeight'));
        this.set('hexagonWidth', this.get('hexsideWidth') + this.get('centerWidth'));
        this.set('halfHexagonHeight', this.get('hexagonHeight') / 2);
        this.set('halfHexagonWidth', this.get('hexagonWidth') / 2);
        this.set('oneFourthHexagonHeight', this.get('hexagonHeight') / 4);
        this.set('leftMapEdge', -(this.get('hexsideWidth') + (this.get('centerWidth') / 2)));

//    this.hexagon = new Hexagon();
        this.hexpart = HexPart;
    },

    setPixels:function(pixelX, pixelY)
    {

        this.calculateHexpartFromPixels(pixelX, pixelY);
        this.calculateHexagonFromPixels();
        this.calculateHexagonNumber();
    },

    setHexagonXY:function(x, y)
    {

        this.set('hexagonX',x);
        this.set('hexagonY', y);
    },

    setHexpartXY:function(x, y)
    {
        this.mapGridX = (this.halfHexagonWidth * x) - this.originX;
        this.mapGridY = (this.oneFourthHexagonHeight * y) - this.originY;
        this.setXY(x, y);
    },

    calculateHexpartFromPixels:function(pixelX, pixelY)
    {

        var hexpartX, hexpartY;

        // adjust for hexagonGrid origin
        this.set('mapGridX', pixelX + this.get('originX'));
        this.set('mapGridY', pixelY + this.get('originY'));

        this.set('column', Math.floor((this.get('mapGridX') - this.get('leftMapEdge')) / this.get('hexagonWidth')));
        this.set('distanceFromLeftEdgeOfHexagon', (this.get('mapGridX') - this.get('leftMapEdge')) - (this.get('column') * this.get('hexagonWidth')));

        if (this.get('distanceFromLeftEdgeOfHexagon') < this.get('hexsideWidth')) {

            //  it's a / or \ hexside
            hexpartX = (2 * this.get('column')) - 1;
            this.set('row', Math.floor(this.get('mapGridY') / this.get('halfHexagonHeight')));
            hexpartY = (2 * this.get('row')) + 1;
            this.set('distanceFromTopEdgeOfHexagon', this.get('mapGridY') - (this.get('row') * this.get('topHeight')));
        }
        else
        {

            // it's a center or lower hexside
            hexpartX = 2 * (this.get('column'));
            this.set('mapGridY', this.get('mapGridY') + this.get('oneFourthHexagonHeight'));
            this.set('row', Math.floor(this.get('mapGridY') / this.get('halfHexagonHeight')));
            hexpartY = (2 * this.get('row'));
            this.set('distanceFromTopEdgeOfHexagon', this.get('mapGridY') - (this.get('row') * this.get('topHeight')));
        }
        this.setXY(hexpartX, hexpartY);
    },

    calculateHexagonNumber: function()
    {
        var x, y;
        var $minX = 4;
        var $minY = 8;
        var $evenColumnShiftDown = true;
        x = ( (this.get('hexagonX') -$minX ) / 2 ) + 1;

        if($evenColumnShiftDown === true)
        {
            y = Math.floor(((this.get('hexagonY') - $minY) / 4) + 1);
        } else {
            y = Math.floor(((this.get('hexagonY') - $minY + 2) / 4) + 1);
        }
        this.set('number', x * 100 + y);
    },
    calculateHexagonFromPixels:function()
    {

        var hexpartX, hexpartY, hexpartType;

        hexpartX = this.get('x');
        hexpartY = this.get('y');
        hexpartType = this.getHexpartType();
        switch (hexpartType)
        {
            case 1:
                this.setHexagonXY(hexpartX, hexpartY);
                break;

            case 2:
                if (this.distanceFromTopEdgeOfHexagon < this.oneFourthHexagonHeight) {
                    this.setHexagonXY(hexpartX, hexpartY - 2);
                }
                else
                {
                    this.setHexagonXY(hexpartX, hexpartY - 2);
//          this.setHexagonXY(hexpartX, hexpartY + 2);
                }
                break;

            case 3:
                // check the tangent of the hexside line with tangent of the mappoint
                //
                // the hexside line tangent is opposite / adjacent = this.hexsideWidth / this.topHeight
                // the mappoint tangent is opposite / adjacent =  this.distanceFromLeftEdgeOfHexagon / this.distanceFromTopEdgeOfHexagon
                //
                // is mappoint tangent <  line tangent ?
                // (this.distanceFromLeftEdgeOfHexagon / this.distanceFromTopEdgeOfHexagon) < (this.hexsideWidth / this.topHeight)
                //
                // multiply both sides by this.topHeight
                // (this.distanceFromLeftEdgeOfHexagon / this.distanceFromTopEdgeOfHexagon) * this.topHeight  < (this.hexsideWidth )
                //
                // multiply both sides by this.distanceFromTopEdgeOfHexagon
                // (this.distanceFromLeftEdgeOfHexagon * this.topHeight ) < (this.distanceFromTopEdgeOfHexagon * this.hexsideWidth)
                //

                if (this.distanceFromLeftEdgeOfHexagon * this.topHeight < this.distanceFromTopEdgeOfHexagon * this.hexsideWidth) {
                    //  ______
                    //  |\ |  |
                    //  | \|  |
                    //  |* |\ |
                    //  |__|_\|
                    //
//          this.setHexagonXY(hexpartX - 1, hexpartY + 1);
                    this.setHexagonXY(hexpartX + 1, hexpartY - 1);
                }
                else
                {
                    //  ______
                    //  |\ |  |
                    //  | \|* |
                    //  |  |\ |
                    //  |__|_\|
                    //
                    this.setHexagonXY(hexpartX + 1, hexpartY - 1);
                }
                break;

            case 4:
                // check the tangent of the hexside line with tangent of the mappoint
                //
                // see above
                //

                if (this.distanceFromLeftEdgeOfHexagon * this.topHeight < this.distanceFromTopEdgeOfHexagon * this.hexsideWidth) {
                    //  ______
                    //  |  | /|
                    //  |* |/ |
                    //  | /|  |
                    //  |/_|_ |
                    //
//          this.setHexagonXY(hexpartX - 1, hexpartY - 1);
                    this.setHexagonXY(hexpartX + 1, hexpartY + 1);
                }
                else
                {
                    //  ______
                    //  |  | /|
                    //  |  |/ |
                    //  | /|* |
                    //  |/_|_ |
                    //
                    this.setHexagonXY(hexpartX + 1, hexpartY + 1);
                }
                break;
        }
    },

    getHexpart:function()
    {
        return this.hexpart;
    },

    getHexagon:function()
    {
        return this.hexagon;
    },

    getPixelX:function()
    {
        return this.get('mapGridX');
    },

    getPixelY:function()
    {
        return this.get('mapGridY');
    }
});