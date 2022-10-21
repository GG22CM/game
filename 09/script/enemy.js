class Enemy {
    constructor(x, y, image, img_w, img_h, maxFrame, size, fps, game) {
        this.x = x
        this.y = y
        this.image = image
        this.img_w = img_w
        this.img_h = img_h
        this.size = size
        this.width = this.img_w * size
        this.height = this.img_h * size
        this.maxFrame = maxFrame
        this.fps = fps
        this.interval = 1000 / this.fps
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
    draw(context) {
        //绘图
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.frame * this.img_w, 0, this.img_w, this.img_h, this.x, this.y, this.width, this.height)
    }
}

export class Fly extends Enemy {
    constructor(game) {
        super(
            game.gameWidth + Math.random() * game.gameWidth * 0.5,
            game.gameHeight * Math.random() * 0.4,
            fly,
            60,
            44,
            5,
            Math.random() + 1,
            20,
            game
        )
        this.vx = (Math.random() * 2 + 3)
        this.angle = 0
        this.curve = Math.random() * 0.2
    }
    update(deltaTime) {
        this.x -= this.vx + this.game.speed
        this.angle += this.curve
        this.y += Math.sin(this.angle) * 5
        super.update(deltaTime)
    }
    draw(context) {
        super.draw(context)
    }
}

export class Plant extends Enemy {

    constructor(game) {
        let size =  Math.random() + 1
        super(
            game.gameWidth,
            game.groundY(87 * size),
            plant,
            60,
            87,
            1,
            size,
            20,
            game
        )
    }
    update(deltaTime) {
        this.x -= this.game.speed
        super.update(deltaTime)
    }
    draw(context) {
        super.draw(context)
    }
}


export class Spider extends Enemy {

    constructor(game) {
        super(
            game.gameWidth,
            game.gameHeight * Math.random() * 0.6,
            spider,
            310,
            175,
            5,
            Math.random() * 0.2 + 0.2,
            20,
            game
        )
        this.vy = Math.random() * 20 - 10
    }
    update(deltaTime) {
        this.x -= this.game.speed
        this.y += this.vy
        super.update(deltaTime)
        if (this.y < - this.height) this.deleteMark = true
    }
    draw(context) {
        context.beginPath()
        context.moveTo(this.x + this.width * 0.5, 0)
        context.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.5)
        context.stroke()
        super.draw(context)
    }
}