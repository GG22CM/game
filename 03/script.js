/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 800


const image1 = new Image()
image1.src = 'static/enemy1.png'
const image2 = new Image()
image2.src = 'static/enemy2.png'
const image3 = new Image()
image3.src = 'static/enemy3.png'
const image4 = new Image()
image4.src = 'static/enemy4.png'


let gameFrame = 0

class EnemyParent {
    constructor(img_w, img_h, image) {
        
        this.img_x = 0
        this.img_y = 0
        this.img_h = img_h
        this.img_w = img_w
        let scale = Math.random() * 1.5 + 2
        this.width = img_w / scale
        this.height = img_h / scale
        this.x = Math.random() * (CANVAS_WIDTH - this.width)
        this.y = Math.random() * (CANVAS_HEIGHT - this.height)
        this.image = image
        this.img_interval = Math.floor(Math.random() * 2 + 1)
    }
    draw() {
        // ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.img_x, this.img_y, this.img_w, this.img_h, this.x, this.y, this.width, this.height)
    }
    update() {
        this.draw()
    }
}

class Enemy1 extends EnemyParent {
    constructor() {
        super(293,155,image1)
    }
    update () {
        this.x += Math.random() * 5 - 2.5
        this.y += Math.random() * 5 - 2.5
        let position = Math.floor(gameFrame / this.img_interval) % 6
        this.img_x = position * this.img_w
        super.update()
    }
}


class Enemy2 extends EnemyParent {
    constructor() {
        super(266,188,image2)
        this.angle = 0
        this.curve = Math.random() * 7
        this.angleSpeed = Math.random() * 0.2
    }
    update () {
        if (this.x < - this.width) this.x = CANVAS_WIDTH
        this.angle += this.angleSpeed
        this.x -= 3
        this.y += Math.sin(this.angle) * this.curve
        let position = Math.floor(gameFrame / this.img_interval) % 6
        this.img_x = position * this.img_w
        super.update()
    }
}


class Enemy3 extends EnemyParent {
    constructor() {
        super(218,177,image3)
        this.angle = 0
        // this.curve = Math.random() * 200 + 50
        this.angleSpeed = Math.random() * 2 + 0.5
    }
    update () {
        this.angle += this.angleSpeed
        this.x = Math.sin(this.angle * Math.PI / 90) * canvas.width / 2 + (canvas.width / 2 - this.width / 2)
        this.y = Math.cos(this.angle * Math.PI / 270) * canvas.height / 2 + (canvas.height / 2 - this.height / 2)
        let position = Math.floor(gameFrame / this.img_interval) % 6
        this.img_x = position * this.img_w
        super.update()
    }
}


class Enemy4 extends EnemyParent {
    constructor() {
        super(213,213,image4)
        this.newX = Math.random() * (CANVAS_WIDTH - this.width)
        this.newY = Math.random() * (CANVAS_HEIGHT - this.height)
        this.interval = Math.floor(Math.random() * 300  + 200)
        this.speed = Math.random() * 20 + 20
    }
    update () {
        if (gameFrame % this.interval == 0) {
            this.newX = Math.random() * (CANVAS_WIDTH - this.width)
            this.newY = Math.random() * (CANVAS_HEIGHT - this.height)
        }
        let tx = this.newX - this.x
        let ty = this.newY - this.y
        this.x += tx / this.speed
        this.y += ty / this.speed
        let position = Math.floor(gameFrame / this.img_interval) % 9
        this.img_x = position * this.img_w
        super.update()
    }
}



function factory (ObjClass, number) {
    let objArr = []
    for (let i = 0; i < number; i ++) {
        let obj = new ObjClass()
        objArr.push(obj)
    }
    return objArr
}


function animate(enemys) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemys.forEach(item => {
        item.update()
    })
    gameFrame ++
    requestAnimationFrame(() => {
        animate(enemys)
    })
}

// let enemy1s = factory(Enemy1, 10)
// animate(enemy1s)

// let enemy2s = factory(Enemy2, 10)
// animate(enemy2s)

// let enemy3s = factory(Enemy3, 10)
// animate(enemy3s)

// let enemy4s = factory(Enemy4, 10)
// animate(enemy4s)

