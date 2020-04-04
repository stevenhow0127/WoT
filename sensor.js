var onoff = require('onoff');

var Gpio = onoff.Gpio, 
    led = new Gpio(4, 'out'),
    sensor = new Gpio(15, 'in', 'both');

sensor.watch(function(err, value){
    if(err) exit(err);
    console.log(value ?'I got light!' :'I lost all light...');
    led.writeSync(value ?1 :0);
});

function exit(err){
    if (err) console.log('An error occurred: '+err);
    sensor.unexport();
    led.writeSync(0);
    led.unexport();
    console.log('Bye then...');
    process.exit();
}

process.on('SIGINT', exit);