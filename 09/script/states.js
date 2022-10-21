import {Hit} from './particle.js'


class State {
    constructor(state, player) {
        this.state = state
        this.player = player
    }
    enter(frameY, maxFrame) {
        this.player.frameY = frameY
        this.player.maxFrame = maxFrame
        this.player.frame = 0
    }
}





class Running extends State {
    constructor(player) {
        super('RUNNING')
        this.player = player
    }
    enter() {
        super.enter(3, 8)
        this.player.currentParticle = 'Dust'
    }
    change(input) {
        if (input.has('Down')) this.player.setState('SITTING', 0)
        else if (input.has('Up')) this.player.setState('JUMPING', 5)
        else if (input.has('Roll') && this.player.game.skillSchedule >= 0.1) this.player.setState('ROLLING', 10)
    }   
}

class Sitting extends State {
    constructor(player) {
        super('SITTING')
        this.player = player
    }
    enter() {
        super.enter(5, 4)
        this.player.game.speed = 0
        this.player.currentParticle = ''
    }
    change(input) {
       if (!input.has('Down')) {
            this.player.setState('RUNNING', 5)
        }
       
    }
}



class Jumping extends State {
    constructor(player) {
        super('JUMPING')
        this.player = player
    }
    enter() {
        super.enter(1, 6)
        this.player.currentParticle = ''

    }
    change(input) {
        if (this.player.vy >= 0) {
            this.player.setState('FALLING', 5)
        }else if (input.has('Roll') && this.player.game.skillSchedule >= 0.1 ) this.player.setState('ROLLING', 10)
        else if (input.has('Down')) this.player.setState('HITTING', 5)    

    }
}


class Falling  extends State {
    constructor(player) {
        super('FALLING')
        this.player = player
    }
    enter() {
        super.enter(2, 6)
        this.player.currentParticle = ''
    }
    change(input) {
        if (this.player.onGround()) this.player.setState('RUNNING', 5)
        else if (input.has('Roll') && this.player.game.skillSchedule >= 0.1 ) this.player.setState('ROLLING', 10)
        else if (!this.player.onGround() && input.has('Down')) this.player.setState('HITTING', 5)    
    }   
}


class Rolling  extends State {
    constructor(player) {
        super('ROLLING')
        this.player = player
    }
    enter() {
        super.enter(6, 6)
        this.player.vx = 2 * this.player.vx
        this.player.weight = 1
        this.player.currentParticle = 'Fire'
        this.player.game.skillSpeed = - 0.005
        quiet.pause()
        active.play()
      
    }
    change(input) {
        if (!input.has('Roll') || this.player.game.skillSchedule <= 0) {
            if (this.player.onGround()) {
                this.player.setState('RUNNING', 5)
            }else if (this.player.vy >= 0) {
                this.player.setState('FALLING', 5)
            }else {
                this.player.setState('JUMPING', 5)
            }
        }else if (!this.player.onGround() && input.has('Down')) {
            this.player.setState('HITTING', 5)
        }
    }
}

class Hitting  extends State {
    constructor(player) {
        super('HITTING')
        this.player = player
    }
    enter() {
        super.enter(6, 6)
        this.player.vy = 60
        this.player.vx = 0
        this.player.currentParticle = 'Fire'
    }
    change(input) {
        if (this.player.onGround()) {
            for (let i = 0; i < 10; i++) {
                this.player.particles.unshift(new Hit(this.player.game, this.player.x + this.player.width * Math.random(), this.player.y + this.player.height))
            }
        }
        if (this.player.onGround() && input.has('Roll')) this.player.setState('ROLLING', 10)
        else if (this.player.onGround() && input.has('Down')) this.player.setState('SITTING', 0)
        else if (this.player.onGround()) this.player.setState('RUNNING', 5)
        
    }
}

class Fainting  extends State {
    constructor(player) {
        super('FAINTING')
        this.player = player
        this.timer = 0
    }
    enter() {
        super.enter(4, 10)
        this.player.currentParticle = ''
        this.timer = this.player.game.time
    }
    change(input) {
        if (this.player.game.time - this.timer > 1000) this.player.setState('RUNNING', 5)
    }
}



export default function (game) {
    return {
        RUNNING: new Running(game),
        SITTING: new Sitting(game),
        JUMPING: new Jumping(game),
        FALLING: new Falling(game),
        ROLLING: new Rolling(game),
        HITTING: new Hitting(game),
        FAINTING: new Fainting(game)

    }
}
