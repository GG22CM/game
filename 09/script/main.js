import Input from './input.js'
import Player from './player.js'
import Background from './background.js'
import {Fly, Plant, Spider} from './enemy.js'
import UI from './ui.js'


window.onload = () => {
    const canvas = canvas1
    const h2 = loading
    const ctx = canvas.getContext('2d')
    h2.style.display = 'none'
    canvas.width = 1400
    canvas.height = 720
   

    class Game {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.groundHeight = 120
            this.input = new Input()
            this.keys = this.input.inputKeys
            this.speed = 0
            this.player = new Player(this)
            this.background = new Background(this)
            this.ui = new UI(this)
            this.enemys = []
            this.poms = []
            this.texts = []
            this.timer = 0
            this.interval = 3000
            this.gamestart = false
            this.gameover = false
            this.debug = false
            this.score = 0
            this.time = 0
            this.heartNum = 5
            this.skillSchedule = 0
            this.skillSpeed = 0.001
          
        }
        update(deltaTime) {
            
            if (!this.gamestart && this.keys.has('Right')) {
                this.gamestart = true
                quiet.play()
            }

            if (!this.gamestart) return;

            if (this.heartNum <= 0) this.gameover = true

            //技能进度条
            this.skillSchedule += this.skillSpeed
            if (this.skillSchedule >= 1) this.skillSchedule = 1
            else if (this.skillSchedule <= 0) this.skillSchedule = 0
            this.debug = this.keys.has('Debug')
            this.timer += deltaTime
            this.time += deltaTime
            if (this.timer > this.interval) {
                this.timer = 0
                this.enemys.push(new Fly(game))
                if (this.player.currentState != this.player.states['SITTING'] && Math.random() < 0.5) this.enemys.push(new Plant(game))
                else if (this.player.currentState != this.player.states['SITTING']) this.enemys.push(new Spider(game))
            }
            [this.background, this.player, ...this.player.particles,...this.enemys, ...this.texts,...this.poms].forEach(item => item.update(deltaTime))
            this.clearDelete('poms', 'enemys', 'texts')
            this.player.particles = this.player.particles.filter(item => !item.deleteMark)
            this.player.particles.length > 50 && (this.player.particles.length = 50)
            // console.log(this.player.particles);
        }
        draw(context) {
            context.shadowColor = "white";
            context.shadowOffsetX = -2;
            context.shadowOffsetY = -2;
            context.shadowBlur = 4;
            [this.background, this.player, ...this.player.particles, ...this.enemys, ...this.texts,...this.poms].forEach(item => item.draw(context))
            this.ui.draw(context)
        }
        groundY (height) {
            return this.gameHeight - height - this.groundHeight
        }
        clearDelete(...s) {
            s.forEach(c => {
                this[c] = this[c].filter(item => !item.deleteMark)
            })
        }
    }

    const game = new Game(canvas.width, canvas.height)
   
    let lastTime = 0

    function animate(timestamp) {
        let deltaTime = timestamp - lastTime
        lastTime = timestamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        if (!game.gameover)requestAnimationFrame(animate)
    }
    animate(0)
}