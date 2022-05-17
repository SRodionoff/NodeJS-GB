const EventEmitter = require ('events');
const emitter = new EventEmitter();
let deadline = process.argv[2];
class Handler {
    static send(){
        console.log(`ПиСи краш через: ${getTimeRemaining(deadline).total / 1000}`)
    }
    static stop() {
        console.log('Не получилось');
        clearInterval(timer);
    }
}
emitter.on("send", Handler.send);
emitter.on("stop",Handler.stop);


function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    return {
        'total': t,
        'seconds': seconds
    };
    
};
let timer = setInterval(() => {
    if (getTimeRemaining(deadline).total > 0) {
        emitter.emit("send")
    } else {
        emitter.emit("stop")
    }
},1000);