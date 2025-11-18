const EVENTS = {
    ADD_PLAYER: 0,
    OTHER_EVENT: 1
}

class Game {
    listeners = {}
    

    notify(event){
        const callbacks = this.listeners[event]
        callbacks.forEach(callback => {
            callback()
        });
    }

    on(event, callback){
        if(!this.listeners[event]){
            this.listeners[event] = []
        }

        this.listeners[event].push(callback)
    }

    // Singleton pattern
    // Observer pattern
}



function sayHelloWorld(){
    console.log("Hello World!")
}

function sayHelloSamuel(){
    console.log("Samuel vimboy!")
}

function sayPedroGuedes(){
    console.log("Pedro Guedes Rei do Javascript")
}

const game = new Game()

game.on(EVENTS.ADD_PLAYER, sayHelloWorld)
game.on(EVENTS.OTHER_EVENT, sayHelloSamuel)

game.on(EVENTS.ADD_PLAYER, sayPedroGuedes)
game.notify(EVENTS.OTHER_EVENT)