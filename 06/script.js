window.onload = () => {
    /** @type {HTMLCanvasElement} */
    canvas1.width = 500
    canvas1.height = 800


   

    class Enemy {
        constructor(x, y, image, img_w, img_h, maxFrame, size, interval, game) {
            this.x = x
            this.y = y
            this.image = image
            this.img_w = img_w
            this.img_h = img_h
            this.size = size
            this.width = this.img_w * size
            this.height = this.img_h * size
            this.maxFrame = maxFrame
            this.interval = interval
            this.game = game
            this.deleteMark = false
            this.frame = 0
            this.timer = 0
        }
        update(deltaTime) {
            
            //修改动画帧
            this.timer += deltaTime
            if (this.timer > this.interval) {
                this.timer = 0
                ++ this.frame > this.maxFrame && (this.frame = 0)
            }

            //标记删除
            if (this.x < -this.width) this.deleteMark = true

        }
        draw() {
            //绘图
            this.game.ctx.drawImage(this.image, this.frame * this.img_w, 0, this.img_w, this.img_h, this.x, this.y, this.width, this.height)
        }
    }

    class Worm extends Enemy {
        constructor(game) {
            super(
                canvas1.width, 
                canvas1.height - 171 * 0.5,
                worm,
                229,
                171,
                5,
                0.5,
                100,
                game
            )
            this.vx = Math.random() * 0.1 + 0.1

        }
        update(deltaTime) {
            this.x -= deltaTime * this.vx
            super.update(deltaTime)
        }
        draw() {
            super.draw()
        }
    }
    class Ghost extends Enemy{
        constructor(game) {
            super(
                canvas1.width, 
                Math.random() * canvas1.height * 0.6,
                ghost,
                261,
                209,
                5,
                0.4,
                100,
                game
            )
            this.vx = Math.random() * 0.2 + 0.1
            this.angle = 0
            this.curve = Math.random() * 0.2
        }
        update(deltaTime) {
            this.x -= deltaTime * this.vx
            this.angle += this.curve
            this.y += Math.sin(this.angle) * 10
            super.update(deltaTime)
        }
        draw() {
            this.game.ctx.globalAlpha = 0.5
            super.draw()
            this.game.ctx.globalAlpha = 1
        }
    }
    class Spider extends Enemy{
        constructor(game) {
            super(
                Math.random() * canvas1.width, 
                -175 * 0.6,
                spider,
                310,
                175,
                5,
                0.6,
                100,
                game
            )
            this.targetY = Math.random() * this.game.canvasHeight
            this.removeY = -2 * this.height
            
        }
        update(deltaTime) {
            let vy = (this.targetY - this.y) / 30
            vy > 0 ? vy =  Math.ceil(vy) : vy =  Math.floor(vy)
            this.y += vy
            this.y >= this.targetY && (this.targetY = this.removeY)
            this.y <= this.removeY && (this.deleteMark = true)
            super.update(deltaTime)
            
        }
        draw() {
            let ctx = this.game.ctx
            ctx.beginPath()
            ctx.moveTo(this.x + this.width * 0.5, 0)
            ctx.lineTo(this.x + this.width * 0.5, this.y)
            ctx.stroke()
            super.draw()
        }
    }


    class Game {
        constructor(canvas) {
            this.elType = ['Worm', 'Ghost', 'Spider']
            this.elements = []
            this.interval = 100
            this.timer = 0
            this.ctx = canvas.getContext('2d')
            this.canvasHeight = canvas.height
            this.canvasWidth = canvas.width


        }

        update(deltaTime) {
            this.timer += deltaTime
            if (this.timer > this.interval) {
                this.timer = 0
                this.#addElement()
            }
            this.elements.forEach(item => item.update(deltaTime))
            //删除元素
            this.elements = this.elements.filter(item => !item.deleteMark)
        }

        draw() {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            this.elements.forEach(item => item.draw())
        }

        #addElement() {
            //随机添加游戏元素
            let obj
            eval(`obj = new ${this.elType[Math.round(Math.random() * (this.elType.length - 1))]}(this)`)
            this.elements.push(obj)
         
        }
    }

    let lastTimestamp = 0
    const game = new Game(canvas1)
    function animate(timestamp = 0) {
        let deltaTime = timestamp - lastTimestamp
        lastTimestamp = timestamp
        game.update(deltaTime)
        game.draw()
        requestAnimationFrame(animate)
    }

    animate()

}