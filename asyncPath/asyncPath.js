
/**
 * The MIT License (MIT)
 * Copyright (c) 2015 Mfoncho Che
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * 
 *
 */



/**
 * @author       Mfoncho Che
 * @copyright    2015 Mfoncho Che
 * @license      {@link http://opensource.org/licenses/MIT}
 */




/** 
* @class Phaser.Plugin.asyncPath
* @constructor
* @param {Any} parent - The object that owns this plugin, usually Phaser.PluginManager.
**/



Phaser.Plugin.asyncPath = function (parent) {
    Phaser.Plugin.call(this, parent);

    this._parent = parent;

    /**
     * [worker]
     * @type {Array}
     */
    var worker = [Phaser.Plugin.asyncPath.worker_nameSpace_main + Phaser.Plugin.asyncPath.worker_CalculatePath + Phaser.Plugin.asyncPath.worker_getSoroundingNodes + Phaser.Plugin.asyncPath.worker_sortHeap + Phaser.Plugin.asyncPath.worker_sortHeapGroup + Phaser.Plugin.asyncPath.worker_algorithm + Phaser.Plugin.asyncPath.worker_setNodesCost + Phaser.Plugin.asyncPath.worker_findpathTo];
   
   
   /**
    * [worker_file]
    * @type {Blob}
    * @private
    */
    this.worker_file = new Blob(worker,{type: 'script/js'});

    /**
     * [_start blocks origin points]
     * @private
     * @type {asyncPoint}
     */
    this._start = { X: null, Y: null };



    /**
     * [_webWorker is plugin using webworker]
     * @private
     * @default false
     * @type {Boolean}
     */
    this._webWorker = false;



    /**
     * [this_workerSize]
     * @private
     * @default 0
     * @type {Number}
     */
    
    this._workerSize = 0;



    /**
     * [_specific layer]
     * @type {Boolean}
     */
    this._specific = false






    /**
     * [_specific_layer_name]
     * @type {string}
     */
    this._specific_layer_name = null






    /**
     * [_stop blocks destination points]
     * @private
     * @type {asyncPoint}
     */
    this._stop = { X: null, Y: null };


    /**
     * [_map 2D Map]
     * @private
     * @default null
     * @type {Phaser.Tilemap}
     */
    this._map = null;


    /**
     * [_mapHeight Phaser.Tilemap.Height]
     * @private
     * @default null
     * @type {number}
     */
    this._mapHeight = null;


    /**
     * [_mapWidth Phaser.Tilemap.Width]
     * @private
     * @default null
     * @type {number}
     */
    this._mapWidth = null;


    /**
     * [_avoidTile]
     * @default []
     * @private
     * @type {[number]}
     */
    this._avoidTile = [];


    /**
     * [_version_ ]
     * @type {String}
     * @private
     */
    this._version_ = "1.0.0";



    /**
     * [_centerPoints makes paths returned to point to tile center]
     * @default true
     * @private
     * @type {Boolean}
     */
    this._centerPoints = true;


    /**
     * [_mapset state of Phaser.Tilemap in plugin]
     * @default false
     * @private
     * @type {Boolean}
     */
    this._mapset = false;



    /**
     * [this_debugPathcolor]
     * @private
     * @default 0xFFFF00
     * @type {Base16 number}
     */
    this_debugPathcolor = 0xFFFF00




    /**
     * [_DiagonalCost Diagonal movement cost]
     * @default 14
     * @private
     * @type {Number}
     */
    this._diagonalCost = 14;


    /**
     * [_verticalCost vertical movement cost]
     * @default 10
     * @private
     * @type {Number}
     */
    this._verticalCost = 10;


    /**
     * [_horizontalCost horizontal movement cost]
     * @default 10
     * @private
     * @type {Number}
     */
    this._horizontalCost = 10;


    /**
     * [_gridSet state of asyncNodeGrid
     * @default false
     * @private
     * @type {Boolean}
     */
    this._gridSet = false;


    /**
     * [_paths_per_sec number of path finding calculation to do per frame]
     * @private
     * @default 2
     * @type {Number}
     */
    this._paths_per_sec = 2;



    /**
     * [_pathpixel path return type]
     * @private
     * @default true
     * @type {Boolean}
     */
    this._pathpixel = true;



    /**
     * [_findQueue list of block to be calculated]
     * @private
     * @default []
     * @type {Array}
     */
    this._findQueue = [];

    /**
     * [_gird Nodegride stored as string]
     * @private
     * @default null
     * @type {string}
     */
    this._grid = null;

    /**
     * [_config hold persistent configurations]
     * @private
     * @default {Algorithm:'Manhattan', debugpath:false, Diagonals:false}
     * @type {Object}
     */
    this._config = {Algorithm:'Manhattan', debugpath:false, Diagonals:false};


    /**
     * [_cycletime increamented on each frame]
     * @type {Number}
     */
    this._cycletime = 0;

    /**
     * [_X_Offset Change in X-Tracking that would triger a pathfing calculation]
     * @private 
     * @default 0
     * @type {Number}
     */
    this._X_Offset = 0;

     /**
     * [_Y_Offset Change in Y-Tracking that would triger a pathfing calculation]
     * @private 
     * @default 0
     * @type {Number}
     */
    this._Y_Offset = 0;


    /**
     * [Diagonals Sets the use of Diagonals]
     * @private
     * @default false
     * @type {Boolean}
     */
    this.Diagonals= false;


    /**
     * [Algorithm Sets the Algorithm to used]
     * @private
     * @default Manhattan
     * @type {string}
     */
    this.Algorithm = 'Manhattan'; //Euclidean,Manhattan


    /**
     * [debugpath sets the debuger as active or in active on each path calculation]
     * @private
     * @default true
     * @type {Boolean}
     */
    this.debugpath = true;


    /**
     * [pathResolvedCache holds calculated cache]
     * @private
     * @type {Object}
     */
    this.pathResolvedCache = {};



    /**
     * [workerCache web worker Cache]
     * @private
     * @type {Array}
     */
    this.workerCache = [];



    /**
     * [pathCache]
     * @private
     * @type {Object}
     */
    this.pathCache = {};



    /**
     * [_webWorker main worker state]
     * @private
     * @type {Object}
     */
    this._webWorker = {active: false, count: 0};



    /**
     * [_webWorkerDiagonals]
     * @private
     * @default false
     * @type {Boolean}
     */
    this._webWorkerDiagonals = false;



    /**
     * [_webWorkerDiagonalsCost]
     * @private
     * @default 14
     * @type {Number}
     */
    this._webWorkerDiagonalsCost = 14



    /**
     * [_webWorkerverhorCost ]
     * @private
     * @default 10
     * @type {Number}
     */
    this._webWorkerverhorCost = 10;

}


Phaser.Plugin.asyncPath.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.asyncPath.prototype.constructor = Phaser.Plugin.asyncPath;






/**
 * [get description]
 * @method Phaser.Plugin.asyncPath.version
 * @return {string}  [Version]
 */
Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "version", {
    get: function () {
        return this._version_;
    },
    enumerable: false,
    configurable: false
});





/**
 * returns the number of webWorkers.
 * @prop Phaser.Plugin.async.getbWorkers
 * @public
 * @param {number} 
 */
Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "getWorkers", {
    get: function () {
        return this._webWorker.count
    },
    enumerable: true,
    configurable: true
});






/**
 * returns the number of webWorkers.
 * @prop Phaser.Plugin.async.workerSize
 * @public
 * @param {number} 
 */
Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "getWorkersSize", {
    get: function () {
        return (this._workerSize/1000) + "kb";
    },
    enumerable: true,
    configurable: true
});





/**
 * returns the number of webWorkers.
 * @prop Phaser.Plugin.async.getbWorkerState
 * @public
 * @param {number} 
 */
Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "getWorkerState", {
    get: function () {
        return this._webWorker.active
    },
    enumerable: true,
    configurable: true
});




/**
 * [webWorkerDiagonals]
 * @property Phaser.Plugin.asyncPath.webWorkerDiagonals
 * @public
 * @type {Boolean}
 */
Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "webWorkerDiagonals", {
    set: function (bool) {
        this._webWorkerDiagonals = bool;
    },
    enumerable: true,
    configurable: true
});




/**
 * Sets the cost of the Horizantal and Veritical Movement.
 * @prop Phaser.Plugin.async.webWorkerVerHorCost
 * @public
 * @param {number} [movement cost]
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "webWorkerVerHorCost", {
    set: function (cost) {
        this._webWorkerverhorCost = cost;
    },
    enumerable: true,
    configurable: true
});





/**
 * Sets the cost of the Horizantal and Veritical Movement.
 * @prop Phaser.Plugin.async.webWorkerDiagonalsCost
 * @public
 * @param {number} [movement cost]
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "webWorkerDiagonalsCost", {
    set: function (cost) {
        this._webWorkerDiagonalsCost = cost;
    },
    enumerable: true,
    configurable: true
});






/**
 * Sets map, Tile Width and Height
 * @prop Phaser.Plugin.async.yOffset
 * @public
 * @param {Phaser.Tilemap} 
 */
Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "tileMap", {
    set: function (map) {
        this._map = map;
        this.TileHeight = map.tileHeight;
        this.TileWidth = map.tileWidth;
        this._mapset = true;
    },
    enumerable: true,
    configurable: true
});




/**
 * Change in XY-Tracking that would triger a pathfing calculation
 * @prop Phaser.Plugin.async.xyOffset
 * @public
 * @param {number} 
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "xyOffset", {
    set: function (offset) {
        this._X_Offset = offset;
        this._Y_Offset = offset;
    },
    enumerable: true,
    configurable: true
});




/**
 * Change in X-Tracking that would triger a pathfing calculation
 * @prop Phaser.Plugin.async.xOffset
 * @public
 * @param {number} 
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "xOffset", {
    set: function (offset) {
        this._X_Offset = offset;
    },
    enumerable: true,
    configurable: true
});






/**
 * Change in Y-Tracking that would triger a pathfing calculation
 * @prop Phaser.Plugin.async.yOffset
 * @public
 * @param {number} 
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "yOffset", {
    set: function (offset) {
        this._Y_Offset = offset;
    },
    enumerable: true,
    configurable: true
});





/**
 * Set the path retured to be in units or pixels.
 * @prop Phaser.Plugin.async.use
 * @public
 * @param {string} [units, pixel]
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "use", {
    set: function (scale) {
        switch (scale){
            case 'units':
                this._pathpixel = false;
                break;
            case 'pixel':
                this.pathixel = true;
                break;
            default:
                this._pathpixel = true;
        }
    },
    enumerable: true,
    configurable: true
});



/**
 * Set the path retured to point to tile centers than edges.
 * @prop Phaser.Plugin.async.centerPaths
 * @public
 * @param {boolean}
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "centerPaths", {
    set: function (bool) {
        this._centerPoints = bool
    },
    enumerable: true,
    configurable: true
});




/**
 * Set the path retured to point to tile centers than edges.
 * @prop Phaser.Plugin.async.centerPaths
 * @public
 * @param {boolean}
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "debugColor", {
    set: function (hex_color) {
        this_debugPathcolor = hex_color;
    },
    enumerable: true,
    configurable: true
});




/**
 * sets the number of paths to be calculated on every frame.
 * @prop Phaser.Plugin.async.pathsPerSec
 * @public
 * @param {number}
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "pathsPerSec", {
    set: function (numberofPaths) {
        this._paths_per_sec = numberofPaths;
    },
    enumerable: true,
    configurable: true
});






/**
 * Switches the debuger On or Off.
 * @prop Phaser.Plugin.async.defaultdebug
 * @public
 * @param {boolean}
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "defaultdebug", {
    set: function (on) {
        if(on){
        this._config.debugpath = on;
        this.debugpath = on;
        
        }
    },
    enumerable: true,
    configurable: true
});





/**
 * Sets the cost of the Horizantal and Veritical Movement.
 * @prop Phaser.Plugin.async.VertHorCost
 * @public
 * @param {number} [movement cost]
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "VertHorCost", {
    set: function (cost) {
        this._verticalCost = cost;
        this._horizontalCost = cost;
        this._config.VertHorCost = cost;
    },
    enumerable: true,
    configurable: true
});






/**
 * Sets the non walkable tile index.
 * @prop Phaser.Plugin.async.nonWalkableTile
 * @public
 * @param {number} [tile index]
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "nonWalkableTile", {
    set: function (tile) {
        if(tile instanceof Object){
            for(var i = 0; i < tile.length; i++){
                this._avoidTile.push(tile[i]);
            }
        }
        else{
            this._avoidTile.push(tile);
        }
        
    },
    enumerable: true,
    configurable: true
});





/**
 * Sets the use of Diagonals .
 * @prop Phaser.Plugin.async.useDiagonals
 * @public
 * @param {boolean} [Diagonals use]
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "useDiagonals", {
    set: function (bool) {
        this._config.Diagonals = bool;
        this.Diagonals= bool;
    },
    enumerable: true,
    configurable: true
});




/**
 * Sets the layer to be avoided .
 * @prop Phaser.Plugin.async.nonWalkableLayer
 * @public
 * @param {string} 
 */

Object.defineProperty(Phaser.Plugin.asyncPath.prototype, "nonWalkableLayer", {
    set: function (layer) {
        if(this._mapset){         
            for(var i = 0; i < this._map.layers.length; i++){
                if(this._map.layers[i].name === layer){
                    var _avoidLayer = this._map.layers[i];
                    var _nodeGrid = [];
                    for (var y = 0; y < _avoidLayer.height; y++){
                        _nodeGrid[y] = [];
                        for (var x = 0; x < _avoidLayer.width; x++){
                            var Node = {};
                            var alreadyIn = this.shouldAvoid(_avoidLayer.data[y][x].index);
                            if(_avoidLayer.data[y][x].index !== -1){
                                if(!alreadyIn){this._avoidTile.push(_avoidLayer.data[y][x].index);} 
                                Node = this.setasNonWalkable(x,y);
                            }
                            else{
                                Node = this.setasWalkable(x,y);
                            }
                        _nodeGrid[y].push(Node);
                        }
                    }
                
                this._grid = JSON.stringify(_nodeGrid);
                this._gridSet = true;
                break;
                }
            }
        }
        else{
            console.warn("Please Set TileMap first");
        }
    },
    enumerable: true,
    configurable: true
});





/**
 * [useSpecific description]
 * @param  {array} tile_Array
 * @param  {string} layer_Name
 * @return {[type]}  
 */
Phaser.Plugin.asyncPath.prototype.useSpecific = function (tile_Array, layer_Name){
    this._specific_layer_name = layer_Name;
    this.nonWalkableTile = tile_Array;
    this._specific = true;
    this.setNodeGrid();
}






/**
 * Determines if the tile if tile is approved or not .
 * @method Phaser.Plugin.async.getPath
 * @private
 * @param {number} tile index
 * @return {bool} 
 */

Phaser.Plugin.asyncPath.prototype.shouldAvoid = function (tile) {
    for(var i = 0; i < this._avoidTile.length; i++){
        if(tile === this._avoidTile[i]){
            return true;
        }
    }

    return false;
}



/**
 * Adds new block to the pathfind Queue .
 * @method Phaser.Plugin.async.getPath
 * @public
 * @param {block} asynCords
 * @return {void} 
 */

Phaser.Plugin.asyncPath.prototype.getPath = function(block){
    var uid = this.get_uid("acyncPath-xxxx-xx-xxx", "x");
    this.pathResolvedCache[uid] = block
    this.pathResolvedCache[uid].path_uid = uid;
    this.updatequeue(uid);
}






/**
 * Adds new block to the pathfind Queue .
 * @method Phaser.Plugin.async.updatequeue
 * @private
 * @param {block} asynCords
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.updatequeue = function(block){
    this._findQueue.push(block);
}





/**
 * update method called by game in each Frame.
 * @method Phaser.Plugin.async.update
 * @private
 * @param {} asynCords
 * @return {void} 
 */

Phaser.Plugin.asyncPath.prototype.update = function(){
    if(this._findQueue.length > 0 && this.game.time.now > this._cycletime){
        this._cycletime = this.game.time.now + (1000/this._paths_per_sec);
        var block, path;
        block = this.pathResolvedCache[this._findQueue.shift()];
        if(block !== undefined){
            this.asyncConfig(block);

            if(block.keepTrack !== undefined && block.keepTrack){
                this.pathManager(block);            
            }
            else{        
                this.onetimePath(block);
            }
            this.resolevedPathManager();
            this.reset(); 
        }

    }
    
}





/**
 * fires the found or notfound function when path has been resoved in block.
 * @method Phaser.Plugin.async.asyncfire
 * @private
 * @param {block} asynCords
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.asyncfire = function(block){
    if(block.change){
        if(block.path.length > 0 && block.found instanceof Function){
            block.found(block.path);
        }
        else if(block.notfound instanceof Function){
            block.notfound();
        }
        block.change = false;
    }

    if(block.keepTrack === undefined || block.keepTrack === false){
        this.removePath(block.path_uid);
    }
}






/**
 * Manages untracked block.
 * @method Phaser.Plugin.async.onetimePath
 * @private
 * @param {block} asynCords
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.onetimePath = function(block){

    if((block.forcemain !== undefined && block.forcemain) || !this._webWorker.active ){                
        block.path = this.findpathTo(block.Origin, block.Destination);
    }
    else{
        var _block = {
            Origin: {x: block.Origin.x, y: block.Origin.y},
            Destination: {x: block.Destination.x, y: block.Destination.y},
            id: block.path_uid           
        };
        var worker = this.workerCache[0];
        worker.postMessage(_block);
    }
    block.change = true;
}





/**
 * [removePath description]
 * @method Phaser.Plugin.asyncPath.removePath
 * @private
 * @param  {string} uid 
 * @return {void}  
 */
Phaser.Plugin.asyncPath.prototype.removePath = function (uid) {
    delete this.pathResolvedCache[uid];
}










/**
 * Configues Plugin for Cords.
 * @method Phaser.Plugin.async.asyncConfig
 * @private
 * @param {cords} asynCords
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.asyncConfig = function(cords){
    var configs = ['Diagonals','Algorithm','debugpath'];
    var _this = this;
    configs.forEach(function(configuraion){
        if(cords[configuraion] !== undefined){
            _this[configuraion] = cords[configuraion];
        }
    });
}




/**
 * Manages the path finding Queue.
 * @method Phaser.Plugin.async.pathManager
 * @private
 * @param {cords} asynCords
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.pathManager = function(block){
    var _block = {
            Origin: {x: block.Origin.x, y: block.Origin.y},
            Destination: {x:block.Destination.x, y: block.Destination.y},
            id: block.path_uid           
        }

    var worker = this.workerCache[0];

    if(block.lastx !== undefined && block.lasty !== undefined){
        var x_off = block.x_off || this._X_Offset;
        var y_off = block.y_off || this._Y_Offset;
        var xChanged = (block.lastx > (block[block.trackBy].x + x_off)) || (block.lastx < (block[block.trackBy].x - x_off));
        var yChanged = (block.lasty > (block[block.trackBy].y + y_off)) || (block.lasty < (block[block.trackBy].y - y_off));
        
               
        if( xChanged || yChanged ){
                block.change = true;
                block.lastx = block[block.trackBy].x;
                block.lasty = block[block.trackBy].y;
                if((block.forcemain !== undefined && block.forcemain) || !this._webWorker.active ){                
                    block.path = this.findpathTo(block.Origin, block.Destination);
                }
                else{

                    worker.postMessage(_block);
                }
        }       
    }


    else {
            block.lastx = block[block.trackBy].x;
            block.lasty = block[block.trackBy].y;
            block.path = [];
            block.change = true;
            if((block.forcemain !== undefined && block.forcemain) || !this._webWorker.active ){              
                block.path = this.findpathTo(block.Origin, block.Destination);
            }
            else{
                worker.postMessage(_block);
            }
    }

    this.updatequeue(block.path_uid);
}







/**
 * Clears Path drawn on canvas by debuger.
 * @method Phaser.Plugin.async.clearVisual
 * @private
 * @param {}
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.clearVisual = function(){
    if(this.debugpath && this.graphics !== undefined){
        this.graphics.clear();
    }
}







/**
 * Finds the path form PointA to PointB.
 * @method Phaser.Plugin.async.findpathTo
 * @private
 * @param {Origin} asynPoint
 * @param {Destination} asynPoint
 * @return {array} An array of Phaser.Plugin.asyncPoints unit
 */
Phaser.Plugin.asyncPath.prototype.findpathTo = function (Origin, Destination) {
    var designation = ['_start','_stop'];
    var axis = ['X','Y'];
    var NodeGrid;
    var Path = [];

    this._start.X = Math.floor(Origin.x / this._map.tileWidth);
    this._start.Y = Math.floor(Origin.y / this._map.tileHeight);
    
    

    this._stop.X = Math.floor(Destination.x / this._map.tileWidth);   
    this._stop.Y = Math.floor(Destination.y / this._map.tileHeight);

    
    for(var i = 0; i < 2; i++){
        for(var j = 0; j < 2; j++){
            if(this[designation[i]][axis[j]] < 0){
                this[designation[i]][axis[j]] = 0;
            }
        }
    }


    NodeGrid = this.setNodeGrid();
    NodeGrid = this.setTeminalNodes(NodeGrid);
    Path = this.CalculatePath(NodeGrid);


    return Path;
}







/**
 * Sets asyncNodeGrid.
 * @method Phaser.Plugin.async.setNodeGrid
 * @private
 * @param {} 
 * @return {asyncNodeGrid} asyncNodeGrid
 */
Phaser.Plugin.asyncPath.prototype.setNodeGrid = function () {
    var NodeGrid = [];

    if(!this._gridSet){
        var tile;
        var _avoidLayer;
        if(this._specific){
            for(var i = 0; i < this._map.layers.length;  i++){
                if(this._map.layers[i].name === this._specific_layer_name){
                    _avoidLayer = this._map.layers[i];
                    break;
                }
            }
        }
        else{
            _avoidLayer = this._map.layers[0];
        }
        for (var y = 0; y < this._map.height; y++) {
            NodeGrid[y] = [];
            for (var x = 0; x < this._map.width; x++) {
                var Node = {};
                tile = _avoidLayer.data[y][x].index;          
                var badTile = this.shouldAvoid(tile); 
                if (badTile) {
                    Node = this.setasNonWalkable(x, y);
                }
                else {
                    Node = this.setasWalkable(x, y);
                }
                NodeGrid[y].push(Node);
            }
        }
        this._grid = JSON.stringify(NodeGrid);
        this._gridSet = true;
    }
    else{
        
        NodeGrid = JSON.parse(this._grid);
    }

    return NodeGrid;
}







/**
 * Sets Teminal Nodes and Node costs on asyncNodeGrid.
 * @method Phaser.Plugin.async.setTeminalNodes
 * @private
 * @param {asyncNodeGrid} asyncNodeGrid
 * @return {asyncNodeGrid} asyncNodeGrid
 */
Phaser.Plugin.asyncPath.prototype.setTeminalNodes = function (NodeGrid) {
    var Distance;
    NodeGrid[this._start.Y][this._start.X].StartNode = true;
    NodeGrid[this._start.Y][this._start.X].Gcost = 0;

    NodeGrid[this._stop.Y][this._stop.X].StopNode = true;
    NodeGrid[this._stop.Y][this._stop.X].Hcost = 0;
    
    Distance = this[this.Algorithm](NodeGrid[this._start.Y][this._start.X], NodeGrid[this._stop.Y][this._stop.X]);
    NodeGrid[this._start.Y][this._start.X].Hcost = Distance;
    NodeGrid[this._stop.Y][this._stop.X].Gcost = Distance;
    NodeGrid[this._start.Y][this._start.X].Fcost = Distance;
    NodeGrid[this._stop.Y][this._stop.X].Fcost = Distance;

    return NodeGrid;
}








/**
 * Calculate the path.
 * @method Phaser.Plugin.async.CalculatePath
 * @private
 * @param {asyncNodeGrid} asyncNodeGrid
 * @return {array} An array of Phaser.Plugin.ascny.points unit
 */
Phaser.Plugin.asyncPath.prototype.CalculatePath = function (NodeGrid) {

    var list ={ Open: [], Target: null, SortType:'Fcost'};

    var listCandidate = NodeGrid[this._start.Y][this._start.X];

    var suroundingNodes;

    var Path = [];

    var pathFound = false;

    while (!pathFound) {

        suroundingNodes = this.getSoroundingNodes(listCandidate, NodeGrid);

        list = this.setNodesCost(listCandidate, suroundingNodes, list, NodeGrid);

        list = this.sortHeap(list,'Fcost');

        list = this.sortHeapGroup(list,'Hcost');

        listCandidate = list.Open.shift();

        if (listCandidate === undefined) {
            break;
        }

        if(listCandidate.StopNode){

            pathFound = true;

            list.Target = listCandidate;

            break;
        }
   
        
    }
    if (list.Target !== null) {
        Path = this.pathMap(list, NodeGrid);
        
    }
    return Path;
}





/**
 * [resolevedPathManager Manages Resolved Paths]
 * @method Phaser.Plugin.async.resolevedPathManager
 * @public
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.resolevedPathManager = function (){
    _this = this;
    Object.keys(this.pathResolvedCache).forEach( function (uid){
        if(_this.pathResolvedCache[uid] !== undefined){
            var Path = _this.pathResolvedCache[uid].path;
            if(Path !== undefined){
                Path = _this.makePoints(Path);
                _this.asyncfire(_this.pathResolvedCache[uid]);
                _this.clearVisual();
                if(_this.debugpath && Path.length>0){
                    _this.debugger(Path);
                }
            }
        }
    });
}










/**
 * Makes nonWalkable asyncNode.
 * @method Phaser.Plugin.async.setasNonWalkable
 * @private
 * @param {x} number
 * @param {y} number
 * @return {asyncNode} A Unit asyncNode
 */
Phaser.Plugin.asyncPath.prototype.setasNonWalkable = function (x, y) {
    var Node = {};
    Node.Acceptable = false;
    Node.StartNode = false;
    Node.StopNode = false;
    Node.X = x;
    Node.Y = y;
    return Node;
}







/**
 * Makes Walkable asyncNode.
 * @method Phaser.Plugin.async.setasWalkable
 * @private
 * @param {x} number
 * @param {y} number
 * @return {asyncNode} A Unit asyncNode
 */
Phaser.Plugin.asyncPath.prototype.setasWalkable = function (x, y) {
    var Node = {};
    Node.Parent = null;
    Node.Gcost = 0;
    Node.Hcost = 0;
    Node.Fcost = 0;
    Node.Acceptable = true;
    Node.StartNode = false;
    Node.StopNode = false;
    Node.X = x;
    Node.Y = y; 
    return Node;  
}







/**
 * Crawl the results list Target backwards: crawling its Parents.
 * @method Phaser.Plugin.ascny.pathMap
 * @private
 * @param {list} n - list with target node ued to crawl to the start node child.
 * @return {array} An array of Phaser.Plugin.ascny.pathMapUnitNode
 */
Phaser.Plugin.asyncPath.prototype.pathMap = function (list) {
    var Path = [];
    var Node = list.Target;
    var traced = false;
    
    while (!traced) {
        var Point = { X: Node.X, Y: Node.Y };
        Path.unshift(Point);
        Node = Node.Parent;
        if (Node.StartNode) {
            traced = true;
        }
    }
  
    Path.unshift(this._start);

    return Path;
}







/**
 * Sets path in unit or pixel format.
 * @method Phaser.Plugin.ascny.makePoints
 * @private
 * @param {list} n - list of path .
 * @return {array} An array of Phaser.Plugin.ascny.points unit || pixel
 */
Phaser.Plugin.asyncPath.prototype.makePoints = function (path) {
    var Points = [];
    for (var i = 0; i < path.length; i++) {
        var Point = {};

        Point.x = path[i].X
        Point.y = path[i].Y 

        if(this._pathpixel || this.debugpath){
           Point.x *= this.TileWidth;
           Point.y *= this.TileHeight; 
        }

        if(this._centerPoints){
           Point.x += (this.TileWidth / 2)
           Point.y += (this.TileHeight / 2)
        }

        Points.push(Point);
    }

    return Points;
}







/**
 * Sort path list heap.
 * @method Phaser.Plugin.ascny.sortHeap
 * @private
 * @param {heap} list of asyncNodes .
 * @param {prop} key of the property to be sorted by.
 * @return {array} An array of sorted list of asyncNodes.
 */
Phaser.Plugin.asyncPath.prototype.sortHeap = function (heap, prop) {
    for (var i = 0; i < heap.Open.length; i++) {
        for (var j = 0; j < heap.Open.length; j++) {
            if (heap.Open[i][prop] < heap.Open[j][prop]) {
                var temp = heap.Open[i];
                heap.Open[i] = heap.Open[j];
                heap.Open[j] = temp;
            }
        }
    }
    return heap;
}







/**
 * Sort path list heap presice list.
 * @method Phaser.Plugin.ascny.sortHeap
 * @private
 * @param {heap} list of asyncNodes .
 * @param {prop} key of the property to be sorted by.
 * @return {array} An array of presice sorted list of asyncNodes.
 */
Phaser.Plugin.asyncPath.prototype.sortHeapGroup = function (heap, prop) {
    for (var i = 0; i < heap.Open.length; i++) {
        var cost = heap.Open[i].Fcost;
        var j = i;
        while ((j + 1) < heap.Open.length && heap.Open[j + 1].Fcost === cost) {
            var p = i;
            while ((p + 1) < heap.Open.length && heap.Open[p + 1].Fcost === cost) {
                if (heap.Open[j][prop] > heap.Open[p + 1][prop]) {
                    var temp = heap.Open[j];
                    heap.Open[j] = heap.Open[p + 1];
                    heap.Open[p + 1] = temp;
                }
                p++;
            }
            j++;
        }
        i = j;
    }

    return heap;
}








/**
 * Get the sourounding nodes in a grid.
 * @method Phaser.Plugin.ascny.getSoroundingNodes
 * @private
 * @param {Node} asyncNode .
 * @param {NodeGrid} asyncNodeGrid.
 * @return {array} An array sorounding asyncNodes.
 */
Phaser.Plugin.asyncPath.prototype.getSoroundingNodes = function (Node, NodeGrid) {
    var SoroundingNodes = [];
    var NodeUpRight = false;
    var NodeUpLeft = false;
    var NodeDownRight = false;
    var NodeDownLeft = false;
    /// seting null tiles.......
    if (Node.Y !== 0 && NodeGrid[Node.Y - 1][Node.X].Acceptable && !NodeGrid[Node.Y - 1][Node.X].StartNode) {
        ///NodeAbove = true;
        NodeUpLeft = true;
        NodeUpRight = true;
        if (NodeGrid[Node.Y - 1][Node.X].Parent === null) {
            NodeGrid[Node.Y - 1][Node.X].Gcost = Node.Gcost + this._verticalCost;
        }
        SoroundingNodes.push(NodeGrid[Node.Y - 1][Node.X]);
    }
    //else { NodeAbove.Tile = NodeGrid[Node.Tile.x][Node.Tile.y - 1] }
    if (Node.X !== 0 && NodeGrid[Node.Y][Node.X - 1].Acceptable && !NodeGrid[Node.Y][Node.X - 1].StartNode) {
        //NodeLeft.Tile = null;
        NodeUpLeft = true;
        NodeDownLeft = true;
        if (NodeGrid[Node.Y][Node.X - 1].Parent === null) {
            NodeGrid[Node.Y][Node.X - 1].Gcost = Node.Gcost + this._horizontalCost ;
        }
        SoroundingNodes.push(NodeGrid[Node.Y][Node.X - 1]);
    }
    //else { NodeLeft.Tile = NodeGrid[Node.Tile.x - 1][Node.Tile.y] }
    if (Node.Y !== NodeGrid.length - 1 && NodeGrid[Node.Y + 1][Node.X].Acceptable && !NodeGrid[Node.Y + 1][Node.X].StartNode) {
        //NodeBelow.Tile = null;
        NodeDownLeft = true;
        NodeDownRight = true;
        if (NodeGrid[Node.Y + 1][Node.X].Parent === null) {
            NodeGrid[Node.Y + 1][Node.X].Gcost = Node.Gcost + this._verticalCost ;
        }
        SoroundingNodes.push(NodeGrid[Node.Y + 1][Node.X]);
    }
    //else { NodeBelow.Tile = NodeGrid[Node.Tile.x][Node.Tile.y + 1] }
    if (Node.X !== NodeGrid[0].length - 1 && NodeGrid[Node.Y][Node.X + 1].Acceptable && !NodeGrid[Node.Y][Node.X + 1].StartNode) {
        //NodeRight.Tile = null
        if (NodeGrid[Node.Y][Node.X + 1].Parent === null) {
            NodeGrid[Node.Y][Node.X + 1].Gcost = Node.Gcost + this._horizontalCost;
        }
        SoroundingNodes.push(NodeGrid[Node.Y][Node.X + 1]);
    }
    // else { NodeRight.Tile = NodeGrid[Node.Tile.x + 1][Node.Tile.y] }
    
    if (this.Diagonals) {


        if (Node.X === 0) {
            NodeDownLeft = false;
            NodeUpLeft = false;
        }
        if (Node.Y === 0) {
            NodeUpLeft = false;
            NodeUpRight = false;
        }
        if (Node.Y === NodeGrid.length - 1) {
            NodeDownLeft = false;
            NodeDownRight = false;
        }
        if (Node.X === NodeGrid[0].length - 1) {
            NodeDownRight = false;
            NodeUpRight = false;
        }



        if (NodeDownRight && NodeGrid[Node.Y + 1][Node.X + 1].Acceptable && !NodeGrid[Node.Y + 1][Node.X + 1].StartNode) {
            if (NodeGrid[Node.Y + 1][Node.X + 1].Parent === null) {
                NodeGrid[Node.Y + 1][Node.X + 1].Gcost = Node.Gcost + this._diagonalCost;
            }
            SoroundingNodes.push(NodeGrid[Node.Y + 1][Node.X + 1]);
        }
        if (NodeDownLeft && NodeGrid[Node.Y + 1][Node.X - 1].Acceptable && !NodeGrid[Node.Y + 1][Node.X - 1].StartNode) {
            if (NodeGrid[Node.Y + 1][Node.X - 1].Parent === null) {
                NodeGrid[Node.Y + 1][Node.X - 1].Gcost = Node.Gcost + this._diagonalCost;
            }
            SoroundingNodes.push(NodeGrid[Node.Y + 1][Node.X - 1]);
        }
        if (NodeUpLeft && NodeGrid[Node.Y - 1][Node.X - 1].Acceptable && !NodeGrid[Node.Y - 1][Node.X - 1].StartNode) {
            if (NodeGrid[Node.Y - 1][Node.X - 1].Parent === null) {
                NodeGrid[Node.Y - 1][Node.X - 1].Gcost = Node.Gcost + this._diagonalCost;
            }
            SoroundingNodes.push(NodeGrid[Node.Y - 1][Node.X - 1]);
        }
        if (NodeUpRight && NodeGrid[Node.Y - 1][Node.X + 1].Acceptable && !NodeGrid[Node.Y - 1][Node.X + 1].StartNode) {
            if (NodeGrid[Node.Y - 1][Node.X + 1].Parent === null) {
                NodeGrid[Node.Y - 1][Node.X + 1].Gcost = Node.Gcost + this._diagonalCost;
            }
            SoroundingNodes.push(NodeGrid[Node.Y - 1][Node.X + 1]);
        }
    }



    return SoroundingNodes;

}




/**
 * Set cost of the sorounding and update the Open list.
 * @method Phaser.Plugin.ascny.setNodesCost
 * @private
 * @param {Node} asyncNode .
 * @param {SoroundingNodes} asyncNode array 
 * @param {list} array of asyncNodes. 
 * @param {NodeGrid} asyncNodeGrid.
 * @return {array} An array of asyncNodes.
 */
Phaser.Plugin.asyncPath.prototype.setNodesCost = function (Node, SoroundingNodes, list, NodeGrid) {
    
    for (var i = 0; i < SoroundingNodes.length; i++) {
        
        var tempHcost = this[this.Algorithm](SoroundingNodes[i], NodeGrid[this._stop.Y][this._stop.X]);
        var tempFcost = SoroundingNodes[i].Gcost + tempHcost;
     
        SoroundingNodes[i].Hcost = tempHcost;
        SoroundingNodes[i].Fcost = tempFcost;       

        if (SoroundingNodes[i].Parent === null) {
            SoroundingNodes[i].Parent = Node;
            list.Open.push(SoroundingNodes[i]);
        }

        else if (SoroundingNodes[i].Parent.Gcost > Node.Gcost){
            for(var j = 0; j < list.Open.length; j++){
                if(list.Open[j].X === SoroundingNodes[i].X && list.Open[j].Y === SoroundingNodes[i].Y){
                    list.Open[j].Parent = Node;
                    break;
                }
            }
        }
    }

    return list;
}



/**
 * Euclidean algorithm
 * @method Phaser.Plugin.ascny.Euclidean
 * @private
 * @param {Node1} asyncNode .
 * @param {Node2} asyncNode .
 * @return {number} Distance from Node1 to Node2.
 */
Phaser.Plugin.asyncPath.prototype.Euclidean = function (Node1, Node2) {
    var Distance, X, Y;
    X = Node1.X - Node2.X;
    Y = Node1.Y - Node2.Y;
    Distance = Math.floor(Math.sqrt((X * X) + (Y * Y)));
    return Distance;
}





/**
 * Manhattan algorithm
 * @method Phaser.Plugin.ascny.Manhattan
 * @private
 * @param {Node1} asyncNode .
 * @param {Node2} asyncNode .
 * @return {number} Distance from Node1 to Node2.
 */
Phaser.Plugin.asyncPath.prototype.Manhattan = function (Node1, Node2) {
    var H, X, Y;
    X = Math.abs(Node1.X - Node2.X);
    Y = Math.abs(Node1.Y - Node2.Y);        
    H = X + Y; 
    return H;
}






/**
 * Path Debuger
 * @method Phaser.Plugin.ascny.debugger
 * @private
 * @param {path} Array/List of asyncNode .
 * @return {void}.
 */
Phaser.Plugin.asyncPath.prototype.debugger = function (path) {
        var length = path.length;
        this.graphics = this.game.add.graphics(path[0].x, path[0].y);
        this.graphics.beginFill(this_debugPathcolor);
        this.graphics.lineStyle(1, this_debugPathcolor, 1);
        var x = 0;
        var y = 0;
        for (var i = 0; i < length; i++) {
            var j = i + 1;
            if (j < path.length) {
                var X = path[j].x - path[i].x;
                var Y = path[j].y - path[i].y;
                x = x + X;
                y = y + Y;
                this.graphics.lineTo(x, y);
                this.graphics.moveTo(x, y);
            }
        }
        this.graphics.endFill();
}



/**
 * Reset to default configuration setting
 * @method Phaser.Plugin.ascny.reset
 * @private
 * @param {}
 * @return {void}.
 */
Phaser.Plugin.asyncPath.prototype.reset = function () {
    var _this = this;
    Object.keys(this._config).forEach(function (configuraion){
        _this[configuraion] = _this._config[configuraion];
    });

}





/**
 * [newWorker sets/registers new web workers]
 * @public
 * @param {}
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.newWorker = function(){
    var _this = this;
    var workerID = this.get_uid("acyncWorker-xxxx-xx-xxx", "x");
    var _init_= {
            tileHeight: this.TileHeight,
            tileWidth: this.TileWidth,
            init: true,
            grid: this._grid,
            id: workerID,
            Diagonals: this._webWorkerDiagonals,
            DiagonalCost: this._webWorkerDiagonalsCost,
            StraightCost: this._webWorkerverhorCost
            }

   var workerUrl = window.URL.createObjectURL(this.worker_file);
   this.workerCache.unshift(new Worker(workerUrl));

   this._workerSize += this.worker_file.size;
   

   this.workerCache[0].postMessage(_init_);
   this.workerCache[0]._uid = workerID;
   this.workerCache[0].onmessage = function(data){
        if(data.data.state){
            for(var i = 0; i < _this.workerCache.length; i++){
                if(_this.workerCache[i]._uid === data.data.uid){
                    _this.workerCache[i].state = data.data;
                }
            }
        }
        else{
            _this.pathResolvedCache[data.data.path_uid].path = data.data.path;
            _this.priotiesFreeWorkers();
            _this.priotiesWorkersQueue();
        }
   };
   this._webWorker.active = true;
   this._webWorker.count += 1;


   return this.workerCache[0];
}



/**
 * [priotiesFreeWorkers]
 * @private
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.priotiesFreeWorkers = function(){
    var length = this.workerCache.length;
    for(var i = 0; i < length; i++){
        for(var j = 0; j < length; j++){
            if(!this.workerCache[i].state.isfree && this.workerCache[j].state.isfree){
                var temp = this.workerCache[i];
                this.workerCache[i] = this.workerCache[j];
                this.workerCache[j] = temp;
            }
        }
    }
}







/**
 * [priotiesWorkersQueue]
 * @private
 * @return {void} 
 */
Phaser.Plugin.asyncPath.prototype.priotiesWorkersQueue = function(){
    var length = this.workerCache.length;
    for(var i = 0; i < length; i++){
        for(var j = 0; j < length; j++){
            if(!this.workerCache[i].state.isfree && this.workerCache[i].state.Queue > this.workerCache[j].state.Queue){
                var temp = this.workerCache[i];
                this.workerCache[i] = this.workerCache[j];
                this.workerCache[j] = temp;
            }
        }
    }
}








/**
 * [pathCacheRegister register new blocks]
 * @param  {Object} block 
 * @return {Object} 
 */
Phaser.Plugin.asyncPath.prototype.pathCacheRegister = function(block){
    var _uid = this.get_uid("acyncPath-xxxx-xx-xxx", "x");
    this.pathCache[_uid] = block;
    block.uid = _uid;
    return block
}







/**
 * [get_uid]
 * @param  {string} format      [return format]
 * @param  {string} IDnamespace [char to replace]
 * @return {string}             [uid string]
 */
Phaser.Plugin.asyncPath.prototype.get_uid= function (format, IDnamespace) {
    var _this = this;
    var seed = new Date().getTime();
    var regEx = new RegExp('[' + IDnamespace + ']', 'g');
    var UID = format.replace(regEx, function (c) {
        var r = (seed + Math.random() * 16) % 16 | 0;
        return (c === IDnamespace.split("")[_this.setBy] ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return UID;
};







/********************************************************************
 *                          [asyncWoker]
 *                           @param  {}
 *                         @return {string} 
 ********************************************************************/

Phaser.Plugin.asyncPath.worker_nameSpace_main = "\nasyncWoker = function(data) {\n\
    this.Algorithm = \"Manhattan\" \n\
    this._grid = data.grid;\n\
    this._tileWidth = data.tileWidth;\n\
    this._tileHeight = data.tileHeight;\n\
    this._start = {}\n\
    this._stop = {}\n\
    this._uid = data.id\n\
    this._verticalCost = data.StraightCost\n\
    this._horizontalCost = data.StraightCost\n\
    this._diagonalCost = data.DiagonalCost\n\
    this._free_ = true\n\
    this.Diagonals= data.Diagonals\n\
    this._Queue = []\n\
}";

Phaser.Plugin.asyncPath.worker_CalculatePath = "\n\
\nasyncWoker.prototype.CalculatePath = function (NodeGrid) { \n\
    var list = { Open: [], Target: null, SortType:'Fcost'};\n\
    var listCandidate = NodeGrid[this._start.Y][this._start.X];\n\
    var suroundingNodes;\n\
    var Path = [];\n\
    var pathFound = false;\n\
    while (!pathFound) {\n\
        suroundingNodes = this.getSoroundingNodes(listCandidate, NodeGrid);\n\
        this.setNodesCost(listCandidate, suroundingNodes, list, NodeGrid);\n\
        list = this.sortHeap(list,'Fcost');\n\
        list = this.sortHeapGroup(list,'Hcost');\n\
        listCandidate = list.Open.shift();\n\
        if (listCandidate === undefined) {\n\
            break;\n\
            }\n\
        if(listCandidate.StopNode){\n\
            pathFound = true;\n\
            list.Target = listCandidate;\n\
            break;\n\
        }\n\
    }\n\
    if (list.Target !== null) {\n\
        Path = this.pathMap(list, NodeGrid);\n\
    }\n\
    return Path;\n\
};\n\
asyncWoker.prototype.pathresolveQueue = function (){\n\
    if(this._Queue.length > 0){\n\
        this._free_ = false;\n\
        self.postMessage({state:true, uid:this._uid, isfree:this._free_, Queue:this._Queue.length})\n\
        var _block = this._Queue.shift();\n\
        var _path = this.findpathTo(_block.Origin, _block.Destination);\n\
        self.postMessage({path_uid:_block.id, path:_path})\n\
    }\n\
    else{\n\
        this._free_ = true;\n\
        self.postMessage({state:true, uid:this._uid, isfree:this._free_, Queue:this._Queue.length})\n\
    }\n\
\n\
}"


Phaser.Plugin.asyncPath.worker_getSoroundingNodes = "\nasyncWoker.prototype.getSoroundingNodes = function (Node, NodeGrid) {\n\
    var SoroundingNodes = [];\n\
    var NodeUpRight = false;\n\
    var NodeUpLeft = false;\n\
    var NodeDownRight = false;\n\
    var NodeDownLeft = false;\n\
    if (Node.Y !== 0 && NodeGrid[Node.Y - 1][Node.X].Acceptable && !NodeGrid[Node.Y - 1][Node.X].StartNode) {\n\
        ///NodeAbove = true;\n\
        NodeUpLeft = true;\n\
        NodeUpRight = true;\n\
        if (NodeGrid[Node.Y - 1][Node.X].Parent === null) {\n\
            NodeGrid[Node.Y - 1][Node.X].Gcost = Node.Gcost + this._verticalCost;\n\
        }\n\
        SoroundingNodes.push(NodeGrid[Node.Y - 1][Node.X]);\n\
    }\n\
    if (Node.X !== 0 && NodeGrid[Node.Y][Node.X - 1].Acceptable && !NodeGrid[Node.Y][Node.X - 1].StartNode) {\n\
        NodeUpLeft = true;\n\
        NodeDownLeft = true;\n\
        if (NodeGrid[Node.Y][Node.X - 1].Parent === null) {\n\
            NodeGrid[Node.Y][Node.X - 1].Gcost = Node.Gcost + this._horizontalCost ;\n\
        }\n\
        SoroundingNodes.push(NodeGrid[Node.Y][Node.X - 1]);\n\
    }\n\
    if (Node.Y !== NodeGrid.length - 1 && NodeGrid[Node.Y + 1][Node.X].Acceptable && !NodeGrid[Node.Y + 1][Node.X].StartNode) {\n\
        NodeDownLeft = true;\n\
        NodeDownRight = true;\n\
        if (NodeGrid[Node.Y + 1][Node.X].Parent === null) {\n\
            NodeGrid[Node.Y + 1][Node.X].Gcost = Node.Gcost + this._verticalCost ;\n\
        }\n\
        SoroundingNodes.push(NodeGrid[Node.Y + 1][Node.X]);\n\
    }\n\
    if (Node.X !== NodeGrid[0].length - 1 && NodeGrid[Node.Y][Node.X + 1].Acceptable && !NodeGrid[Node.Y][Node.X + 1].StartNode) {\n\
        if (NodeGrid[Node.Y][Node.X + 1].Parent === null) {\n\
            NodeGrid[Node.Y][Node.X + 1].Gcost = Node.Gcost + this._horizontalCost;\n\
        }\n\
        SoroundingNodes.push(NodeGrid[Node.Y][Node.X + 1]);\n\
    }\n\
    if (this.Diagonals) {\n\
        if (Node.X === 0) {\n\
            NodeDownLeft = false;\n\
            NodeUpLeft = false;\n\
        }\n\
        if (Node.Y === 0) {\n\
            NodeUpLeft = false;\n\
            NodeUpRight = false;\n\
        }\n\
        if (Node.Y === NodeGrid.length - 1) {\n\
            NodeDownLeft = false;\n\
            NodeDownRight = false;\n\
        }\n\
        if (Node.X === NodeGrid[0].length - 1) {\n\
            NodeDownRight = false;\n\
            NodeUpRight = false;\n\
        }\n\
        if (NodeDownRight && NodeGrid[Node.Y + 1][Node.X + 1].Acceptable && !NodeGrid[Node.Y + 1][Node.X + 1].StartNode) {\n\
            if (NodeGrid[Node.Y + 1][Node.X + 1].Parent === null) {\n\
                NodeGrid[Node.Y + 1][Node.X + 1].Gcost = Node.Gcost + this._diagonalCost;\n\
            }\n\
            SoroundingNodes.push(NodeGrid[Node.Y + 1][Node.X + 1]);\n\
        }\n\
        if (NodeDownLeft && NodeGrid[Node.Y + 1][Node.X - 1].Acceptable && !NodeGrid[Node.Y + 1][Node.X - 1].StartNode) {\n\
            if (NodeGrid[Node.Y + 1][Node.X - 1].Parent === null) {\n\
                NodeGrid[Node.Y + 1][Node.X - 1].Gcost = Node.Gcost + this._diagonalCost;\n\
            }\n\
            SoroundingNodes.push(NodeGrid[Node.Y + 1][Node.X - 1]);\n\
        }\n\
        if (NodeUpLeft && NodeGrid[Node.Y - 1][Node.X - 1].Acceptable && !NodeGrid[Node.Y - 1][Node.X - 1].StartNode) {\n\
            if (NodeGrid[Node.Y - 1][Node.X - 1].Parent === null) {\n\
                NodeGrid[Node.Y - 1][Node.X - 1].Gcost = Node.Gcost + this._diagonalCost;\n\
            }\n\
            SoroundingNodes.push(NodeGrid[Node.Y - 1][Node.X - 1]);\n\
        }\n\
        if (NodeUpRight && NodeGrid[Node.Y - 1][Node.X + 1].Acceptable && !NodeGrid[Node.Y - 1][Node.X + 1].StartNode) {\n\
            if (NodeGrid[Node.Y - 1][Node.X + 1].Parent === null) {\n\
                NodeGrid[Node.Y - 1][Node.X + 1].Gcost = Node.Gcost + this._diagonalCost;\n\
            }\n\
            SoroundingNodes.push(NodeGrid[Node.Y - 1][Node.X + 1]);\n\
        }\n\
    }\n\
    return SoroundingNodes;\n\
}";


Phaser.Plugin.asyncPath.worker_sortHeapGroup  = "\nasyncWoker.prototype.sortHeapGroup = function (heap, prop) {\n\
    for (var i = 0; i < heap.Open.length; i++) {\n\
        var cost = heap.Open[i].Fcost;\n\
        var j = i;\n\
        while ((j + 1) < heap.Open.length && heap.Open[j + 1].Fcost === cost) {\n\
            var p = i;\n\
            while ((p + 1) < heap.Open.length && heap.Open[p + 1].Fcost === cost) {\n\
                if (heap.Open[j][prop] > heap.Open[p + 1][prop]) {\n\
                    var temp = heap.Open[j];\n\
                    heap.Open[j] = heap.Open[p + 1];\n\
                    heap.Open[p + 1] = temp;\n\
                }\n\
                p++;\n\
            }\n\
            j++;\n\
        }\n\
        i = j;\n\
    }\n\
    return heap;\n\
}\n\
\n\
asyncWoker.prototype.getNodeGrid = function(){\n\
    return JSON.parse(this._grid);\n\
}\n\
\n\
asyncWoker.prototype.setTeminalNodes = function (NodeGrid) {\n\
    var Distance;\n\
    NodeGrid[this._start.Y][this._start.X].StartNode = true;\n\
    NodeGrid[this._start.Y][this._start.X].Gcost = 0;\n\
\n\
    NodeGrid[this._stop.Y][this._stop.X].StopNode = true;\n\
    NodeGrid[this._stop.Y][this._stop.X].Hcost = 0;\n\
    \n\
    Distance = this[this.Algorithm](NodeGrid[this._start.Y][this._start.X], NodeGrid[this._stop.Y][this._stop.X]);\n\
    NodeGrid[this._start.Y][this._start.X].Hcost = Distance;\n\
    NodeGrid[this._stop.Y][this._stop.X].Gcost = Distance;\n\
    NodeGrid[this._start.Y][this._start.X].Fcost = Distance;\n\
    NodeGrid[this._stop.Y][this._stop.X].Fcost = Distance;\n\
\n\
    return NodeGrid;\n\
}\n\
asyncWoker.prototype.pathMap = function (list) {\n\
    var Path = [];\n\
    var Node = list.Target;\n\
    var traced = false;\n\
    \n\
    while (!traced) {\n\
        var Point = { X: Node.X, Y: Node.Y };\n\
        Path.unshift(Point);\n\
        Node = Node.Parent;\n\
        if (Node.StartNode) {\n\
            traced = true;\n\
        }\n\
    }\n\
  \n\
    Path.unshift(this._start);\n\
\n\
    return Path;\n\
}";



Phaser.Plugin.asyncPath.worker_sortHeap = "\nasyncWoker.prototype.sortHeap = function (heap, prop) {\n\
    for (var i = 0; i < heap.Open.length; i++) {\n\
        for (var j = 0; j < heap.Open.length; j++) {\n\
            if (heap.Open[i][prop] < heap.Open[j][prop]) {\n\
                var temp = heap.Open[i];\n\
                heap.Open[i] = heap.Open[j];\n\
                heap.Open[j] = temp;\n\
            }\n\
        }\n\
    }\n\
    return heap;\n\
}";


Phaser.Plugin.asyncPath.worker_setNodesCost = "\nasyncWoker.prototype.setNodesCost = function (Node, SoroundingNodes, list, NodeGrid) {\n\
    for (var i = 0; i < SoroundingNodes.length; i++) {\n\
        var tempHcost = this[this.Algorithm](SoroundingNodes[i], NodeGrid[this._stop.Y][this._stop.X]);\n\
        var tempFcost = SoroundingNodes[i].Gcost + tempHcost;\n\
        SoroundingNodes[i].Hcost = tempHcost;\n\
        SoroundingNodes[i].Fcost = tempFcost;\n\
        if (SoroundingNodes[i].Parent === null || SoroundingNodes[i].Parent.Gcost > Node.Gcost) {\n\
            SoroundingNodes[i].Parent = Node;\n\
            list.Open.push(SoroundingNodes[i]);\n\
        }\n\
    }\n\
    return list;\n\
}";


Phaser.Plugin.asyncPath.worker_algorithm = "\nasyncWoker.prototype.Manhattan = function (Node1, Node2) {\n\
    var H, X, Y;\n\
    X = Math.abs(Node1.X - Node2.X);\n\
    Y = Math.abs(Node1.Y - Node2.Y);\n\
    H = X + Y;\n\
    return H;\n\
}\n\
\n asyncWoker.prototype.Euclidean = function (Node1, Node2) {\n\
    var Distance, X, Y;\n\
    X = Node1.X - Node2.X;\n\
    Y = Node1.Y - Node2.Y;\n\
    Distance = Math.floor(Math.sqrt((X * X) + (Y * Y)));\n\
    return Distance;\n\
}\n\
\n asyncWoker.prototype.tick = function () {\n\
    var _this = this;\n\
    setInterval(function(){\n\
        _this.pathresolveQueue();\n\
    });\n\
}\n\
self.onmessage = function (block){\n\
    if(block.data.init){\n\
        asyncWoker.worker = new asyncWoker(block.data)\n\
        asyncWoker.worker.tick();\n\
        self.postMessage({state:true, uid:block.data.id, isfree:true})\n\
    }\n\
    else{\n\
        asyncWoker.worker.updateQueue(block.data)\n\
    }\n\
\n\
}\n\
asyncWoker.prototype.updateQueue = function (block){\n\
    this._Queue.push(block)\n\
\n\
}"



Phaser.Plugin.asyncPath.worker_findpathTo = "\nasyncWoker.prototype.findpathTo = function (Origin, Destination) {\n\
    var designation = ['_start','_stop'];\n\
    var axis = ['X','Y'];\n\
    var NodeGrid;\n\
    var Path = [];\n\
\n\
    this._start.X = Math.floor(Origin.x / this._tileWidth);\n\
    this._start.Y = Math.floor(Origin.y / this._tileHeight);\n\
    \n\
    \n\
    this._stop.X = Math.floor(Destination.x / this._tileWidth);\n\
    this._stop.Y = Math.floor(Destination.y / this._tileHeight);\n\
\n\
    \n\
    for(var i = 0; i < 2; i++){\n\
        for(var j = 0; j < 2; j++){\n\
            if(this[designation[i]][axis[j]] < 0){\n\
                this[designation[i]][axis[j]] = 0;\n\
            }\n\
        }\n\
    }\n\
\n\
\n\
    NodeGrid = this.getNodeGrid();\n\
    NodeGrid = this.setTeminalNodes(NodeGrid);\n\
    Path = this.CalculatePath(NodeGrid);\n\
\n\
\n\
    return Path;\n\
}";


