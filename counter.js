const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('stop_word', (text) => {
    let boom = process.argv[2]
    function getTimeRemaining(beforeBoom) {
        let t = Date.parse(beforeBoom) - Date.now(),
            seconds = Math.floor((t/1000))
            return {
                'total': t,
                'seconds': seconds,
                };
                
    };
    getTimeRemaining(boom).seconds;
    const interval = setInterval(() => {
        if (((getTimeRemaining(boom).seconds) > 0) == true) {
            // console.log(text);
            console.log("Синий экран смерти через: "+(getTimeRemaining(boom).seconds))
        } else {
            console.log(text)
            // console.log("До исполнения: "+(getTimeRemaining(boom).seconds))
            clearInterval(interval);
        }
    }, 1000);
});
emitter.emit('stop_word', 'Ладно, шучу. Галя, отмена.');