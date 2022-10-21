class Particle {
    constructor(game) {
        this.game = game;
        this.deleteMark = false;        
    }
    update() {
        this.x -= this.vx + this.game.speed;
        this.y -= this.vy;
        this.size *= 0.95
        if (this.size < 0.5) this.deleteMark = true;
    }
}


class Dust extends Particle {
    constructor(game, x, y) {
        super(game)
        this.x = x;
        this.y = y;
        this.vx = Math.random();
        this.vy = Math.random();
        this.color = 'rgba(0, 0, 0, 0.1)'
        this.size = 15
    }
    update() {
        super.update()
    }
    draw(context) {
        context.save()
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 0;
        context.beginPath()
        context.fillStyle = this.color
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fill()
        context.restore()
    }
}

class Fire extends Particle {
    constructor(game, x, y) {
        super(game)
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 10;
        this.vy = Math.random() * 10;
        this.image = fire
        this.size = 100
        this.angle = Math.random() * 6.2
    }
    update() {
        super.update()
    }
    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size)
        ctx.restore()
    }
}


export class Hit extends Particle {
    constructor(game, x, y) {
        super(game)
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 20  - 10
        this.sizeModifier = Math.random()  + 0.5
        this.vy = 30 * (2 - this.sizeModifier);
        this.image = fire
        this.size = 50 * this.sizeModifier
        this.angle = Math.random() * 6.2
        this.weight = 2 * (2 - this.sizeModifier)
    }
    update() {
        this.vy -= this.weight
        this.y -= this.vy
        this.x += this.vx + this.game.speed
        if (this.y > this.game.gameHeight) this.deleteMark = true
    }
    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size)
        ctx.restore()
    }
}



const particles = {
    Dust,
    Fire,
    Hit
}

export default function (name, ...args) {
    return new particles[name](...args)
}