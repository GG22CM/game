/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const canvasClient = canvas.getBoundingClientRect()

const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 700

const poms = []



let image = new Image()
image.src = 'static/pom.png'



class Pom {
    constructor(x, y) {
        this.img_x = 0
        this.img_y = 0
        this.img_w = 200
        this.img_h = 179
        this.height = this.img_h / 2
        this.width = this.img_w / 2
        this.x = x 
        this.y = y
        this.angle = Math.random() * 6.2
        this.frame = 0
        this.timer = 0
        this.audio = new Audio()
        this.audio.src = 'static/Ice attack 2.wav'
    }
    draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.strokeRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, this.img_x, this.img_y, this.img_w, this.img_h, -this.width / 2, -this.height / 2, this.width, this.height)
        ctx.restore()
    }
    update() {
      if (this.frame == 0) this.audio.play()
      this.frame++
      this.timer = Math.floor(this.frame / 5)
      this.img_x = this.timer * this.img_w
      if (this.timer > 5) return;
      this.draw()  
    }
}


window.onclick = e => {
    poms.push(new Pom(e.x - canvasClient.x, e.y - canvasClient.y))
}



function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let index = 0; index < poms.length; index++) {
        let item = poms[index]
        item.update()
        if (item.timer > 5) poms.splice(index--, 1)
        
    }
 
    requestAnimationFrame(animate)
}


animate()