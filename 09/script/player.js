import statesFactory from './states.js'
import Pom from './pom.js'
import particleFactory from './particle.js'
import Text from './text.js'


export default class Player {
    constructor(game) {
        this.game = game
        this.gameHeight = game.gameHeight
        this.gameWidth = game.gameWidth
        this.width = 100;
        this.height = 91.3;
        this.x = 0
        this.onGroundY = this.game.groundY(this.height)
        this.y = this.onGroundY
        this.image = dog
        this.states = statesFactory(this)
        this.currentState = this.states['SITTING']
        this.currentState.enter()
        this.timer = 0
        this.fps = 30
        this.interval = 1000 / this.fps
        this.vx = 0
        this.vy = 0
        this.weight = 1.5
        this.stateChangeNum = 0
        this.currentParticle = ''
        this.particles = []
    }
    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.frame * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    update(deltaTime) {
        if (!this.game.gamestart) return;
        //状态改变
        this.currentState.change(this.game.keys)
        //平移
        if (this.game.keys.has('Right') && this.currentState != this.states['SITTING'] && this.currentState != this.states['FAINTING']) {
            this.vx = 15
        }else if (this.game.keys.has('Left') &&  this.currentState != this.states['SITTING'] && this.currentState != this.states['FAINTING']) {
            this.vx = -15
        }else {
            this.vx = 0
        }

        
        this.x += this.vx

        if (this.x <= 0) {
            this.x  = 0
        }else if ( this.x >= this.gameWidth - this.width) {
            this.x = this.gameWidth - this.width
        }

        //跳跃
        if (this.onGround() && this.game.keys.has('Up') &&  this.currentState != this.states['SITTING']) {
            this.vy = -30
        } 
        if (!this.onGround()) {
            this.vy += this.weight
        }
        this.y += this.vy
        if (this.onGround()) {
            this.vy = 0
            this.y = this.onGroundY
        }

        //碰撞检测
        this.game.enemys.forEach(item => {
            if (
                this.x + this.width > item.x &&
                this.x < item.x + item.width &&
                this.y + this.height > item.y &&
                this.y < item.y + item.height
                ) {
                    item.deleteMark = true
                    //添加爆炸
                    this.game.poms.push(new Pom(item.x + item.width * 0.5, item.y + item.height * 0.5, item.size))
                    if (
                        this.currentState != this.states['ROLLING'] &&
                        this.currentState != this.states['HITTING']
                        ) {
                            this.setState('FAINTING', 0)
                            this.game.heartNum--
                        }else {
                            let score = Math.floor(10 * item.size)
                            this.game.texts.push(new Text('+' + score, item.x + item.width * 0.5, item.y + item.height * 0.5, item.size))
                            this.game.score += score
                        } 
                }
        })
       

        //添加粒子特效
        if (this.currentParticle != '') {
            this.particles.unshift(new particleFactory(this.currentParticle, this.game, this.x + this.width * 0.5, this.y + this.height))
        }
         //画动画
         this.timer += deltaTime
         if (this.timer > this.interval) {
             this.timer = 0
             ++this.frame > this.maxFrame && (this.frame = 0)
         }
    }

    setState(state, speed) {
        this.reset()
        this.currentState = this.states[state]
        this.game.speed = speed
        this.currentState.enter()
        this.stateChangeNum++
    }
    reset() {
        this.weight = 1.5
        this.game.skillSpeed = 0.001
        active.pause()
        quiet.play()
        
       
    }
    onGround() {
        return this.y >= this.game.groundY(this.height)
    }
}