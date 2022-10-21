export default class Input {
    constructor () {
        this.lastKey = ''
        window.addEventListener('keydown', e => {
            switch(e.key) {
                case 'ArrowDown':
                    this.lastKey = 'Press down'
                    break;
                case 'ArrowUp':
                    this.lastKey = 'Press up'
                    break;
                case 'ArrowRight':
                    this.lastKey = 'Press right'
                    break;
                case 'ArrowLeft':
                    this.lastKey = 'Press left'
                    break;
            }
        })
        window.addEventListener('keyup', e => {
            switch(e.key) {
                case 'ArrowDown':
                    this.lastKey = 'Release down'
                    break;
                case 'ArrowUp':
                    this.lastKey = 'Release up'
                    break;
                case 'ArrowRight':
                    this.lastKey = 'Release right'
                    break;
                case 'ArrowLeft':
                    this.lastKey = 'Release left'
                    break;
            }
        })
    }
}