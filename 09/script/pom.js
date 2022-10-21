export default class Pom {
    constructor(x, y, size) {
        this.img_x = 0
        this.img_y = 0
        this.img_w = 100
        this.img_h = 179/2
        this.size = size
        this.height = this.img_h * size
        this.width = this.img_w * size
        this.x = x 
        this.y = y
        this.angle = Math.random() * 6.2
        this.frame = 0
        this.maxFrame = 5
        this.image = pom
        this.audio = new Audio()
        this.audio.src = ice.src
        this.deleteMark = false
        this.timer = 0
        this.interval = 100
       
    }
    draw(ctx) {
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