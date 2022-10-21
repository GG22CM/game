export default class UI {
    constructor(game) {
        this.game = game
    }
    draw(context) {
        context.font = '20px Asia'
        context.textAlign  = 'left'
       
        context.fillText('Score: ' + this.game.score, 50, 50)
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(2), 50, 100)
        for (let i = 0; i < this.game.heartNum; i++) {
            context.drawImage(heart, 50 + i * 30, 130, 20, 20)
        }

        if (this.game.gameover) {
            context.textAlign  = 'center'
            context.font = '40px Asia'
            context.fillText('Game Over ! Your score is ' + this.game.score + '. Try to be better !', this.game.gameWidth / 2, this.game.gameHeight / 2)
        }

        context.save()
        context.strokeStyle = 'white'
        context.fillStyle = 'rgba(0, 0, 0, 0.5)'
        if (this.game.skillSchedule >= 1) {
            context.shadowColor = "black";
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 20;
        }
        context.fillRect(50, 170, 200 * this.game.skillSchedule, 20)
       
        context.strokeRect(50, 170, 200, 20)
       
        context.restore()
    }
}