


class State {
    constructor(state) {
        this.state = state
    }
}

class STANDING_RIGHT extends State {
    constructor(player) {
        super('STANDING_RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 0
        this.player.vx = 0
        this.player.maxFrame = 6
       
    }
    change(input) {
        switch(input) {
            case 'Press down':
                this.player.setState('SITTING_RIGHT')
                break;
            case 'Press up':
                this.player.setState('JUMPING_RIGHT')
                break;
            case 'Press right':
                this.player.setState('RUNNING_RIGHT')
                break;
            case 'Press left':
                this.player.setState('RUNNING_LEFT')
                break;
        }
    }
}


class STANDING_LEFT extends State {
    constructor(player) {
        super('STANDING_LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 1
        this.player.vx = 0
        this.player.maxFrame = 6
    }
    change(input) {
        switch(input) {
            case 'Press down':
                this.player.setState('SITTING_LEFT')
                break;
            case 'Press up':
                this.player.setState('JUMPING_LEFT')
                break;
            case 'Press right':
                this.player.setState('RUNNING_RIGHT')
                break;
            case 'Press left':
                this.player.setState('RUNNING_LEFT')
                break;
        }
    }
}
class RUNNING_RIGHT extends State {
    constructor(player) {
        super('RUNNING_RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 6
        this.player.vx = 10
        this.player.maxFrame = 8
    }
    change(input) {
        switch(input) {
            case 'Press down':
                this.player.setState('SITTING_RIGHT')
                break;
            case 'Press up':
                this.player.setState('JUMPING_RIGHT')
                break;
            case 'Press left':
                this.player.setState('RUNNING_LEFT')
                break;
            case 'Release right':
                this.player.setState('STANDING_RIGHT')
                break;
        }
    }
}
class RUNNING_LEFT extends State {
    constructor(player) {
        super('RUNNING_LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 7
        this.player.vx = -10
        this.player.maxFrame = 8
    }
    change(input) {
        switch(input) {
            case 'Press down':
                this.player.setState('SITTING_LEFT')
                break;
            case 'Press up':
                this.player.setState('JUMPING_LEFT')
                break;
            case 'Press right':
                this.player.setState('RUNNING_RIGHT')
                break;
            case 'Release left':
                this.player.setState('STANDING_LEFT')
                break;
        }
        
    }
}
class SITTING_RIGHT extends State {
    constructor(player) {
        super('SITTING_RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 8
        this.player.maxFrame = 4
    }
    change(input) {
        switch(input) {
            case 'Press left':
                this.player.setState('SITTING_LEFT')
                break;
            case 'Release down':
                this.player.setState('STANDING_RIGHT')
                break;
        }
    }
}

class SITTING_LEFT extends State {
    constructor(player) {
        super('SITTING_LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 9
        this.player.maxFrame = 4
    }
    change(input) {
        switch(input) {
            case 'Press right':
                this.player.setState('SITTING_RIGHT')
                break;
            case 'Release down':
                this.player.setState('STANDING_LEFT')
                break;
        }
    }
}

class JUMPING_LEFT extends State {
    constructor(player) {
        super('JUMPING_LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 3
        this.player.maxFrame = 6
        if (this.player.onground()) this.player.vy = -30
    }
    change(input) {
        switch(input) {
            case 'Press right':
                this.player.setState('JUMPING_RIGHT')
                break;
        
        }
        if (this.player.vy >= 0) {
            this.player.setState('FALLING_LEFT')
        }
    }
}

class JUMPING_RIGHT extends State {
    constructor(player) {
        super('JUMPING_RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 2
        this.player.maxFrame = 6
        if (this.player.onground()) this.player.vy = -30
    }
    change(input) {
        switch(input) {
            case 'Press left':
                this.player.setState('JUMPING_LEFT')
                break;
        }
        if (this.player.vy >= 0) {
            this.player.setState('FALLING_RIGHT')
        }
    }
}

class FALLING_RIGHT  extends State {
    constructor(player) {
        super('FALLING_RIGHT')
        this.player = player
    }
    enter() {
        this.player.frameY = 4
        this.player.maxFrame = 6
    }
    change(input) {
        switch(input) {
            case 'Press left':
                this.player.setState('FALLING_LEFT')
                break;
        }
       if (this.player.onground()) this.player.setState('STANDING_RIGHT')
    }
}
class FALLING_LEFT extends State {
    constructor(player) {
        super('FALLING_LEFT')
        this.player = player
    }
    enter() {
        this.player.frameY = 5
        this.player.maxFrame = 6
    }
    change(input) {
        switch(input) {
            case 'Press right':
                this.player.setState('FALLING_RIGHT')
                break;
        
        }
       if (this.player.onground()) this.player.setState('STANDING_LEFT')
    }
}

export default {
    STANDING_LEFT, STANDING_RIGHT, SITTING_LEFT, SITTING_RIGHT,
    JUMPING_LEFT, JUMPING_RIGHT, RUNNING_LEFT, RUNNING_RIGHT,
    FALLING_RIGHT, FALLING_LEFT
}
