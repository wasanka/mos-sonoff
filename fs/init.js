load('api_timer.js');
load('api_gpio.js');
load('api_sys.js');
load('api_mqtt.js');
load('api_config.js');
load('api_log.js');
load('api_math.js');
load('api_file.js');
load('api_rpc.js');

let workTopic = '/devices/' + Cfg.get('mqtt.client_id') + '/switch/';
let stateTopic = '/devices/' + Cfg.get('mqtt.client_id') + '/state/';

// Blink built-in LED every second
GPIO.set_mode(13, GPIO.MODE_OUTPUT); // led
GPIO.set_mode(12, GPIO.MODE_OUTPUT);

Timer.set(3000 /* 2 sec */, true /* repeat */, function() {

  let switchTwo = GPIO.toggle(13);
  let switchThree = GPIO.read(12);
  
  MQTT.pub(stateTopic, JSON.stringify(switchThree), 0);
  
}, null);

MQTT.sub(workTopic, function(conn, topic, msg) {
  print('Received:', workTopic + "1", '->', msg);
  if(msg === "1"){
    GPIO.write(12, 1);
  }else{
    GPIO.write(12, 0);
  }
}, null);