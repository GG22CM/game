window.onload = () => {
    /** @type {HTMLCanvasElement} */
    const GAME_WIDTH = canvas1.width = 1400
    const GAME_HEIGHT = canvas1.height = 720
    const ctx = canvas1.getContext('2d')
    const keyTypes = ['ArrowUp','swipe up', 'swipe down', 'Enter']
    const keys = new Set()
    let score = 0
    let gameover = false


    function fullScreen() {
        alert('yes')
        //asdf
        if (!document.fullscreenElement) {
            canvas1.requestFullscreen().catch(e => alert('Your broswer not support!'))
        }else {
            alert('no')
            document.exitFullscreen()
        }
    }

    fullScreenButton.addEventListener('click', fullScreen)

    function restart() {
        score = 0
        gameover = false
        enemys = []
        background1 = new Background(GAME_WIDTH, GAME_HEIGHT)
        player1 = new Player(GAME_WIDTH, GAME_HEIGHT)
        gameText = new GameText(GAME_WIDTH, GAME_HEIGHT)
        let lastTime = 0
        animate(0)
    }

    class EventHandler {
        constructor() {
            const touchThreshold = 30
            let touchstart;
            window.addEventListener('keydown', e => {
                keyTypes.indexOf(e.key) != -1 && keys.add(e.key)
            })

            window.addEventListener('keyup', e => {
                if (e.key == 'Enter' && gameover) restart()
                keys.delete(e.key)
            })
            window.addEventListener('touchstart', e => {
                touchstart = e.changedTouches[0].pageY
            })

            window.addEventListener('touchmove', e => {
                let y = e.changedTouches[0].pageY
                let num = y - touchstart
                if (num < 0 && -num > touchThreshold) {
                    keys.add('swipe up')
                }
                if (num > 0 && num > touchThreshold && gameover) {
                    keys.add('swipe down')
                }
               
            })

            window.addEventListener('touchend', e => {
                keys.delete('swipe up')
                if (keys.delete(keyTypes[2]) && gameover) {
                    restart()
                }
            })
            
        }
    }


    class Player {
        constructor (gameWidth, gameHeight) {
            this.width = 200
            this.height = 200
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = player
            this.x = 50
            this.y = canvas1.height - this.height
            this.frame = 0
            this.frameY = 0
            this.maxFrame = 8
            this.timer = 0
            this.fps = 20
            this.interval = 1000/this.fps 
            this.vy = 0
            this.weight = 1
        }
        draw(context) {
            // context.beginPath()
            // context.strokeStyle = 'white'
            // context.arc(this.x + this.width / 2 + 10, this.y + this.height / 2 + 20, this.width / 3, 0, Math.PI * 2)
            // context.stroke()
            context.drawImage(this.image, this.frame * this.width,  this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height )
        }
        update(deltaTime) {
            //碰撞检测
            enemys.forEach(item => {
                let dx = (item.x + item.width / 2) - (this.x + this.width / 2 + 10)
                let dy = (item.y + item.height / 2) - (this.y + this.height / 2 + 20)      
                let distance = Math.sqrt(dx * dx + dy * dy)
                let radius =  item.width / 3 +  this.width / 3
                if (distance <= radius) gameover = true
            })


            //控制
            //跳跃
            if (keys.has(keyTypes[0]) ||
                keys.has(keyTypes[1]) 
                && this.onground()) {
                this.vy = -25
            }else if (!this.onground()) {
                this.vy += this.weight
                this.frameY = 1
                this.maxFrame = 6
            }
           
            this.y += this.vy
            if (this.onground()) {
                this.vy = 0
                this.y = this.gameHeight - this.height
                this.frameY = 0
                this.maxFrame = 8
            }

            //画动画
            this.timer += deltaTime
            if (this.timer > this.interval) {
                this.timer = 0
                ++this.frame > this.maxFrame && (this.frame = 0)
            }
        }
        onground() {
            return this.y >= this.gameHeight - this.height
        }
        
    }

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = background
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 720
            this.speed = -5
        }
        draw(context) {
            context.drawImage(this.image, this.x, 0, this.width, this.height)
            context.drawImage(this.image, this.x + this.width + this.speed, 0, this.width, this.height) 
        }
        update() {
            this.x += this.speed
            this.x <= -this.width && (this.x = 0)
        }
    }

   
    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
            this.image = enemy
            this.width = 159
            this.height = 119
            this.x = gameWidth
            this.y = gameHeight - this.height
            this.speed = Math.random() * -5 - 10
            this.frame = 0
            this.maxFrame = 5
            this.timer = 0
            this.fps = 18
            this.interval = 1000/this.fps 
            this.markDelete = false
        }
        draw(context) {
            // context.beginPath()
            // context.strokeStyle = 'white'
            // context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 3, 0, Math.PI * 2)
            // context.stroke()
            context.drawImage(this.image, this.frame * this.width,  0, this.width, this.height, this.x, this.y, this.width, this.height )
        }
        update(deltaTime) {
           
            

            //移动
            this.x += this.speed
            if (this.x < -this.width) {
                this.markDelete = true
                score ++
            }

            //画动画
            this.timer += deltaTime
            if (this.timer > this.interval) {
                this.timer = 0
                ++this.frame > this.maxFrame && (this.frame = 0)
            }
        }
    }

    class GameText {
        constructor(gameWidth, gameHeight) {
           
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
        }
        draw(context) {
            context.textAlign = 'center'
            context.font = '40px Asia'
            context.fillStyle = 'black'
            context.fillText('Score: ' + score, 98, 48)
            context.fillStyle = 'white'
            context.fillText('Score: ' + score, 100, 50)
            if (gameover) {
                context.font = '20px Asia'
                context.fillStyle = 'black'
                context.fillText('GameOver, your score is ' + score + ', press Enter or swipe down to restart', this.gameWidth / 2 - 2, 198)
                context.fillStyle = 'white'
                context.fillText('GameOver, your score is ' + score + ', press Enter or swipe down to restart', this.gameWidth / 2, 200)
                
            }
        }
    }

    let timer = 0
    let interval = Math.random() * 500 + 1500
    let enemys = []

    function handleEnemy(deltaTime) {
        timer += deltaTime
        if (timer > interval) {
            timer = 0
            enemys.push(new Enemy(GAME_WIDTH, GAME_HEIGHT))
        }
        enemys = enemys.filter(item => !item.markDelete)
        enemys.forEach(item => item.update(deltaTime))
        enemys.forEach(item => item.draw(ctx))
    }


    const eventH = new EventHandler()
    let player1 = new Player(GAME_WIDTH, GAME_HEIGHT)
    let background1 = new Background(GAME_WIDTH, GAME_HEIGHT)
    let gameText = new GameText(GAME_WIDTH, GAME_HEIGHT)
    let lastTime = 0

    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas1.width, canvas1.height)
        let deltaTime = timestamp - lastTime
        lastTime = timestamp
        player1.update(deltaTime, enemys)
        background1.update()
        background1.draw(ctx)
        player1.draw(ctx)
        handleEnemy(deltaTime)
        gameText.draw(ctx)
        if (!gameover) requestAnimationFrame(animate)
    }

    animate(0)

   
}