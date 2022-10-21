import Input from './input.js'
import Player from './player.js'
import {drawText} from './utils.js'

window.onload = () => {
    const canvas = canvas1
    const h2 = loading
    const ctx = canvas.getContext('2d')
    h2.style.display = 'none'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const input = new Input()
    const player = new Player(canvas.width, canvas.height)

    let lastTime = 0

    function animate(timestamp) {
        let deltaTime = timestamp - lastTime
        lastTime = timestamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        player.update(input.lastKey, deltaTime)
        player.draw(ctx)
        drawText(ctx, input.lastKey, player.currentState.state)
        requestAnimationFrame(animate)
    }

    animate(0)
}