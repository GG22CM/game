import stateClasses from './states.js'


export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameHeight = gameHeight
        this.gameWidth = gameWidth
        this.width = 200;
        this.height = 181.83;
        this.x = gameWidth / 2 - this.width / 2
        this.y = gameHeight - this.height
        this.image = dog
        this.states = Object.fromEntries(Object.entries(stateClasses).map(item => {
           item[1] = new item[1](this)
           return item
        }))
        this.currentState = this.states['STANDING_RIGHT']
        this.frameY = 0
        this.frame = 0
        this.maxFrame = 6
        this.timer = 0
        this.fps = 10
        this.interval = 1000 / this.fps

        this.vx = 0
        this.vy = 0
        this.weight = 1
    }
    draw(context) {
        context.drawImage(this.image, this.frame * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }

    update(input,deltaTime) {
        //平移
        this.x += this.vx

        //跳跃
        if (!this.onground()) {
            this.vy += this.weight
        }
        this.y += this.vy
        if (this.onground()) {
            this.vy = 0
            this.y = this.gameHeight - this.height
        }

        this.currentState.change(input)

         //画动画
         this.timer += deltaTime
         if (this.timer > this.interval) {
             this.timer = 0
             ++this.frame > this.maxFrame && (this.frame = 0)
         }
    }

    setState(state) {
        this.currentState = this.states[state   ]
        this.currentState.enter()
    }
    onground() {
        return this.y >= this.gameHeight - this.height
    }
}