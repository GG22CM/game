/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')


canvas.width = window.innerWidth
canvas.height = window.innerHeight

/** @type {HTMLCanvasElement} */
const eventCanvas = document.getElementById('canvas2')
const eventCtx = eventCanvas.getContext('2d')


eventCanvas.width = window.innerWidth
eventCanvas.height = window.innerHeight


let score = 0;


let gameover = false;

//乌鸦数组
let ravens = []

//爆炸数组
let poms = []

//粒子数组
let particles = []



class Raven {
    constructor() {
        this.img_x = 0
        this.img_y = 0
        this.img_h = 194
        this.img_w = 271
        this.sizeModifier = Math.random() * 0.6 + 0.4
        this.width = this.img_w * this.sizeModifier
        this.height = this.img_h * this.sizeModifier
        this.x = canvas.width
        this.y = Math.random() * (canvas.height - this.width)
        this.image = new Image() 
        this.image.src = 'static/raven.png'
        this.frame = 0
        this.maxFrame = 5
        this.timer = 0
        this.interval = Math.random() * 100 + 50
        let xScale = Math.random()
        this.speedX = -( xScale * 5 + 3)
        this.speedY = Math.random() * 5 - 2.5

        this.deleteMark = false


        //color
        this.colorArr = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
        ]

        this.hasTail = Math.random() > 0.5
        this.particleTimer = 0
        this.particleInterval = (1 - xScale) * 40 + 10
    }
    update(delayTime) {
        if (this.x < 0) gameover = true
        //运动
        this.x += this.speedX
        if (this.y <= 0 || this.y >= canvas.height - this.height) this.speedY *= -1
        this.y += this.speedY
        
       
        //动画播放
        this.timer += delayTime
        if (this.timer > this.interval) {
            this.timer = 0
            ++this.frame > this.maxFrame && (this.frame = 0)
        }

        //粒子特效
        if (this.hasTail) {
            this.particleTimer += delayTime
            if (this.particleTimer > this.particleInterval) {
                   
                particles.push(new Particle(
                    this.x + Math.random() * (this.width / 2) + this.width / 2,
                    this.y + Math.random() * (this.height / 2) , 
                    this.sizeModifier, this.colorArr))
    
                this.particleTimer = 0
                
            }
    
        }
       
        if (this.x < - this.width) this.deleteMark = true

    }
    draw() {
        eventCtx.fillStyle = `rgb(${this.colorArr[0]},${this.colorArr[1]},${this.colorArr[2]})`
        eventCtx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame * this.img_w, this.img_y, this.img_w, this.img_h, this.x, this.y, this.width, this.height)
    }
}

class Pom {
    constructor(x, y, size) {
        this.img_x = 0
        this.img_y = 0
        this.img_w = 200
        this.img_h = 179
        this.size = size
        this.height = this.img_h * size
        this.width = this.img_w * size
        this.x = x 
        this.y = y
        this.angle = Math.random() * 6.2
        this.frame = 0
        this.maxFrame = 5
        this.image = new Image()
        this.image.src = 'static/pom.png'
        this.audio = new Audio()
        this.audio.src = 'static/Ice attack 2.wav'
        this.deleteMark = false
        this.timer = 0
        this.interval = 100
       
    }
    draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, this.frame * this.img_w, this.img_y, this.img_w, this.img_h, -this.width / 2, -this.height / 2, this.width, this.height)
        ctx.restore()
    }
    update(delayTime) {
      if (this.frame == 0) this.audio.play()
      this.timer += delayTime
      if (this.timer > this.interval) {
              this.timer = 0
              ++this.frame > this.maxFrame && (this.deleteMark = true)
      }

    }
}

class Particle {
    constructor(x, y, size, colorArr) {
        this.size = size
        this.colorArr = colorArr
        this.x = x 
        this.y = y
        this.scale = (Math.random() * 0.5 + 0.5 ) * size
        this.radius = 20 * this.scale
        this.maxRadius = (Math.random() * 10 + 30 ) * this.scale
        this.speed = (Math.random() + 2) * size 
        this.deleteMark = false
        this.timer = 0
        this.interval = 200
        this.opacity = Math.random() * 0.5 + 0.5
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${this.colorArr[0]},${this.colorArr[1]},${this.colorArr[2]},${this.opacity})`
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
        ctx.fill()
    }
    update(delayTime) {
        if (this.radius > this.maxRadius) this.deleteMark = true
        this.timer += delayTime
        if (this.timer > this.interval) {
                this.radius += this.speed
                this.timer = 0
        }
    }
}

let lastTimestamp = 0
let timer = 0
let interval = 1000
let gameTime = 0


//鼠标点击

console.log('adfasdf')
window.onclick = window.ontouchend = e =>  {
    let imgData = eventCtx.getImageData(e.x, e.y, 1, 1).data
    ravens.forEach(item => {
        if (
            item.colorArr[0] == imgData[0] &&
            item.colorArr[1] == imgData[1] &&
            item.colorArr[2] == imgData[2]
            ) {
                //碰撞
                item.deleteMark = true
                poms.push(new Pom(item.x + item.width / 2, item.y + item.height / 2, item.sizeModifier))
                score += Math.floor((1.2 - item.sizeModifier) * 10)
            }
    })

}




function animate(timestamp = 0) {
    if (gameover) {
        ctx.fillStyle = 'black'
        ctx.fillText('Game Over, your score is ' + score, canvas.width / 2 + 5,  canvas.height / 2 + 5);
        ctx.fillStyle = 'white'
        ctx.fillText('Game Over, your score is ' + score, canvas.width / 2, canvas.height / 2);
        return;
    }

    //添加乌鸦
    let delayTime = timestamp - lastTimestamp
    timer += delayTime
    gameTime += delayTime
    lastTimestamp = timestamp
    if (timer > interval) {
        let raven = new Raven()
        raven.speedX *= 1 + gameTime/100000
        ravens.push(raven)
        timer = 0
    }

    //删除元素
    particles = particles.filter(e => !e.deleteMark);
    ravens = ravens.filter(e => !e.deleteMark);
    poms = poms.filter(e => !e.deleteMark);

 
    //排序
    ravens.sort((o1, o2) => o1.sizeModifier - o2.sizeModifier)
    poms.sort((o1, o2) => o1.size - o2.size)
    /**绘画 */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    eventCtx.clearRect(0, 0, eventCanvas.width, eventCanvas.height)
    //绘画计分板
    ctx.textAlign = 'center'
    ctx.font = '40px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + score, canvas.width / 2 + 5, 55);
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + score, canvas.width / 2, 50);
    


    //绘画元素
    [...particles,...ravens,...poms].forEach(item => item.update(delayTime));
    [...particles,...ravens,...poms].forEach(item => item.draw());

    

    requestAnimationFrame(animate)

}

animate()

