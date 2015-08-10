# AsyncPathingFinding(0.0.1)
PhaserJS PathFinding plugin with optional use of web worker configuration. Fast Easy to use

```javascript

```

#Plugin Initialization
```javascript

asyncPath = game.plugins.add(Phaser.Plugin.asyncPath);

```
#Creating a web worker for faster path calculations
A good choice will be using a web Worker only if you have many too many path
finding calculation to be done instantly else setting timers for numeber of calculation to be done in each Phaser Display fram would be much more efficient.
``` newWorker() ``` return the webworker instance so you too can manage

```javascript
asyncPath.newWorker();
```

# Note
If there are now web workers, all path finding calculations run on the main UI thread.
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
