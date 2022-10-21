

class Layer {
    constructor(game, speedModifier, image) {
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 720
        this.game = game
        this.speedModifier = speedModifier
        this.image = image
    }
    update() {
        this.x -=  this.game.speed * this.speedModifier
        if (this.x < -this.width) this.x = 0
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}


export default class Background {
    constructor(game) {
        this.layers = [
            new Layer(game, 0.2, layer1),
            new Layer(game, 0.4, layer2),
            new Layer(game, 0.6, layer3),
            new Layer(game, 0.8, layer4),
            new Layer(game, 1, layer5)
        ]
    }
    update() {
        this.layers.forEach(item => item.update())
    }
    draw(context) {
        this.layers.forEach(item => item.draw(context))
    }
}