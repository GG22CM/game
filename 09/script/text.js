export default class Text {
    constructor(text, x, y, size) {
        this.text = text
        this.x = x
        this.y = y
        this.targetX = 100
        this.targety = 70
        this.timer = 0
        this.deleteMark = false
        this.size = size
    }
    update(deltaTime) {
        this.vx = (this.targetX - this.x) / 30
        this.vy = (this.targety - this.y) / 30
        this.x += this.vx
        this.y += this.vy

        this.timer += deltaTime
        if (this.timer > 2000) this.deleteMark = true
        
        
    }

    draw(context) {
        context.save()
        context.font = this.size * 30 + 'px Asia'
        context.fillText(this.text, this.x, this.y)
        context.restore()
    }
}