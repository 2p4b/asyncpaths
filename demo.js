var game = new Phaser.Game(1150, 832, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
  game.load.tilemap('demoMapJSON', 'assets/gridChallenge.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('map_TileSET', 'assets/tileset01.png');
  game.load.image('car', 'assets/car.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('demoMapJSON');

  map.addTilesetImage('tileset01', 'map_TileSET'); 

  ground = map.createLayer('ground');
  
  wall = map.createLayer('wall');
 

  badTiles = [350,351,352,370,230,250,372,270,391,390, 392, 373, 374, 393];

  map.setCollision(badTiles, true, 'wall', true)//collison tile list far from perfect but plugin reads them just fine

  ground.resizeWorld();


  
  

  asyncPath = game.plugins.add(Phaser.Plugin.asyncPath);
  asyncPath.tileMap = map;
  //asyncPath.useSpecific(badTiles,"wall");
  asyncPath.nonWalkableLayer = "wall";


  cursors = game.input.keyboard.createCursorKeys();

  car = game.add.sprite(40, 40, 'car');

  game.physics.enable(car);

  car.body.collideWorldBounds = true

  

  game.camera.follow(car);

  game.input.onDown.add(findpath, this);
 

}


findpath = function(){
	block = {
		Origin: car,
		Destination: game.input,
		debugpath: true,
		Daigonals: true,
		found: function (path){

		},
		notfound: function (){
			console.log('notfound');
		}
	}
	asyncPath.getPath(block)
}


function update() {

    game.physics.arcade.collide(car, wall);

    car.body.velocity.x = 0;
    car.body.velocity.y = 0;
    car.body.angularVelocity = 0;

    if (cursors.left.isDown)
    {
        car.body.angularVelocity = -100;
    }
    else if (cursors.right.isDown)
    {
        car.body.angularVelocity = 100;
    }

    if (cursors.up.isDown)
    {
        car.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(car.angle, 200));
    }

}
