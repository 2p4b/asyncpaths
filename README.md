# AsyncPathingFinding(0.0.1)
PhaserJS PathFinding plugin with optional use of web worker configuration. Fast Easy to use

```javascript

```

#Plugin Initialization
```javascript

asyncPath = game.plugins.add(Phaser.Plugin.asyncPath);

```

#Plugin Congiurations

Setting the plugin with a map
```javascript
map = game.add.tilemap('mapJSON');
asyncPath.tileMap = map;
```


Setting up Default watchers offset values in X anf Y directions that would trigger a pathfinding calculation on tracked blocks

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

Setting up the returned path congiguration default pixel
```javascript
asyncPath.xOffset = {string} 'units' OR 'pixel'
```



Setting up the returned path congiguration (if the returned paths should point to the center of each tile or the edges) default true
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



Setting Path Debuging cloro
```javascript
asyncPath.debugColor = {HEX_NUMBER}
```



Setting non walkable layer
```javascript
asyncPath.nonWalkableLayer = {string}
```


#Creating a web worker for faster path calculations
A good choice will be using a web Worker only if you have many too many path
finding calculation to be done instantly, else setting timers for numeber of calculation to be done in each Phaser Display frame would be much more efficient. The
``` newWorker() ``` method returns the webworker instance for each worker so you too can manage

```javascript
asyncPath.newWorker();
```

# Note
If there are no web workers, all path finding calculations run on the main UI thread.
The returned webworker instance is managed internaly by the plugin












# | simple sample |

```javascript
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

}

function create() {
 var asyncPath = game.plugins.add(Phaser.Plugin.asyncPath);
 var PointA = {x: 13, y: 14}; // works fine with Sprite, Point, or any object with x and y properties
 var PointB = {x:22, y,44};
 var chain = {
      Origin: PonitA,
      Destination: PointB,
      found: function(path){
              console.log(path);
        },
      notfound: function(){
              console.log('No path found');
        }
    }
  asyncPath.getPath(chain);

}
```
