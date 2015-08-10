# AsyncPathingFinding
PhaserJS PathFinding plugin with optional use of web worker configuration. Fast Easy to use

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
