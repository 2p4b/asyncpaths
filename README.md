# Async. Path Finding 1.0.0
PhaserJS Path Finding plugin, with optional use of web worker configuration. Fast and Easy to use.


### | Quick sample |

```javascript
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

}

function create() {
 var asyncPath = game.plugins.add(Phaser.Plugin.asyncPath);
 var PointA = {x: 13, y: 14}; // works fine with Sprite, Point, or any object with x and y properties
 PointB = {x: 22, y: 44};
 Block = {
      Origin: PointA,
      Destination: PointB,
      found: function(path){
              console.log(path);
        },
      notfound: function(){
              console.log('No path found');
        }
    }
  asyncPath.getPath(Block);

}
```




####Plugin Initialization
```javascript

asyncPath = game.plugins.add(Phaser.Plugin.asyncPath);

```

####Block Configuration

``` javascript
Block = {
  Origin: {x:{number}, y:{number}},
  Destination: {x:{number}, y:{number}},
  keepTrack: {boolean}, Optional
  trackBy: {string}, Optional
  Diagonals: {boolean},  Optional
  debugpath: {boolean},  Optional
  Algorithm: {string},  Optional
  forcemain: {boolean},  Optional
  found: {Function}, Optional
  notfound: {Function}  Optional
  }
```

#
``` javascript
Origin: {x:{number}, y:{number}}
Destination: {x:{number}, y:{number}}
```
#

``` javascript
keepTrack: {boolean} 
```

#
The offset is Calculated on tracked blocks and property.
If tracked property is greater than or less than offset then new path is calculated from Origin to detination

``` javascript
trackBy: {string} 'Origin' OR 'Destination'
``` 

#
Forces path Manager to set new Diagonal setting for this block
``` javascript
Diagonals: {boolean}
```

#
Set the debugging for this block
``` javascript
debugpath: {boolean} 
```


#
Set the Algorithm for this block
``` javascript
Algorithm: {string} 'Manhattan' OR 'Euclidean'
```

#
Forces this block to be solved on the main UI thread even if there is a web worker
``` javascript
forcemain: {boolean} 
```


#
found function is fired each time a path is found
``` javascript
found: {Function} 
```

#
notfound function is fired each time a path is not found
``` javascript
notfound: {Function} 
```


##Plugin Configurations

Setting the plugin with a map
```javascript
map = game.add.tilemap('mapJSON');
asyncPath.tileMap = map;
```


Setting up Default watchers offset values in X and Y directions that would trigger a pathfinding calculation on tracked blocks

```javascript
asyncPath.xyOffset = {number}
```

X offset trigger
```javascript
asyncPath.xOffset = {number}
```

Y offset trigger
```javascript
asyncPath.xOffset = {number}
```

Setting up the returned path configuration default pixel
```javascript
asyncPath.xOffset = {string} 'units' OR 'pixel'
```


Setting up the algorithm to use in pathFinding
```javascript
asyncPath.algorithm = {string} 'Manhattan' OR 'Euclidean'
```


Setting up the return path configuration (if the return path should point to the center of each tile or the edges) default true
```javascript
asyncPath.centerPaths = {boolean} true OR false 
```


Setting up the number of paths to be solved on each Phaser frame
```javascript
asyncPath.pathsPerFrame = {numeber} 
```


Would debug each block except turned off on a block
```javascript
asyncPath.defaultdebug = {boolean} true OR false 
```


Setting custom Cost for vertical and Horizontal movement
Default set to 10
```javascript
asyncPath.VertHorCost = {number} 
```

Setting Diagonal movement
Default set to false
```javascript
asyncPath.useDiagonal = {boolean} true OR false 
```


Setting Non walkable tiles
```javascript
asyncPath.nonWalkableTile = {number} OR {[number]}
```



Setting Path Debuging color
```javascript
asyncPath.debugColor = {HEX_NUMBER}
```



Setting non walkable layer
```javascript
asyncPath.nonWalkableLayer = {string}
```


#Creating a web worker for faster path calculations
A good choice will be using a web Worker only if you have too many path
finding calculations to be done instantly, else setting timers for numeber of calculations to be done in each Phaser Display frame would be much more efficient. The
``` newWorker() ``` method returns a new webworker instance. Webworkers are managed internally by the plugin;

### Note
If there are no web workers, all path finding calculations run on the main UI thread.
The returned webworker instance is managed internally by the plugin


```javascript
asyncPath.newWorker();
```

Sets Algorithm for webworker
```javascript
asyncPath.webWorkerAlgorithm = {string} 'Manhattan' OR 'Euclidean'
```

Set the use of Diagonals in webWorker
```javascript
asyncPath.webWorkerDiagonals = {boolean} true OR false 
```

Set the cost of Vertical and Horizontal movement in webWorker
```javascript
asyncPath.webWorkerVerHorCost = {number}
```

Set the cost of Diagonal movement in webWorker
```javascript
asyncPath.webWorkerDiagonalsCost = {number}
```


