let speed = 5

const control = document.getElementById('bar')
const speedText = document.querySelector('.text>span')

control.value = speed
speedText.innerHTML = speed

control.addEventListener('change', e => {
    speed = e.target.value
    speedText.innerHTML = e.target.value
})


const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const WIDTH = canvas.width = 800
const HEIGHT = canvas.height = 700
const IMG_WID = 2400



class Bgc {
    constructor(image, speedRatio) {
        this.image = image
        this.x = 0
        this.y = 0
        this.speedRatio = speedRatio
    }
    update() {
        if (this.x < -IMG_WID) {
            this.x = 0
        }
        this.x = this.x - this.speedRatio * speed
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y)
        ctx.drawImage(this.image, this.x + IMG_WID, this.y)   
    }
}

let image1 = new Image()
image1.src = 'static/layer-1.png'
let bgc1 = new Bgc(image1, 0.5)
let image2 = new Image()
image2.src = 'static/layer-2.png'
let bgc2 = new Bgc(image2, 0.6)
let image3 = new Image()
image3.src = 'static/layer-3.png'
let bgc3 = new Bgc(image3, 0.7)
let image4 = new Image()
image4.src = 'static/layer-4.png'
let bgc4 = new Bgc(image4, 0.8)
let image5 = new Image()
image5.src = 'static/layer-5.png'
let bgc5 = new Bgc(image5, 1)

let bgcObjects = [bgc1, bgc2, bgc3, bgc4, bgc5]


function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    bgcObjects.forEach(o => {
        o.update()
        o.draw()
    })
    requestAnimationFrame(animate)
}

animate()