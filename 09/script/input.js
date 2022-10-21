export default class Input {
    constructor () {
        this.inputKeys = new Set()
        window.addEventListener('keydown', e => {
            switch(e.key) {
                case 'w':
                case ' ':
                    this.inputKeys.add('Up')
                    break;
                case 's':
                    this.inputKeys.add('Down')
                    break;
                case 'a':
                    this.inputKeys.add('Left')
                    break;
                case 'd':
                    this.inputKeys.add('Right')
                    break;
                case 'Enter':
                    this.inputKeys.add('Roll')
                    break;
            }
        })
        window.addEventListener('keyup', e => {
            switch(e.key) {
                case 'w':
                case ' ':
                    this.inputKeys.delete('Up')
                    break;
                case 's':
                    this.inputKeys.delete('Down')
                    break;
                case 'a':
                    this.inputKeys.delete('Left')
                    break;
                case 'd':
                    this.inputKeys.delete('Right')
                    break;
                case 'Enter':
                    this.inputKeys.delete('Roll')
                    break;
                case 'x':
                    this.inputKeys.has('Debug') ? this.inputKeys.delete('Debug') : this.inputKeys.add('Debug')
                    break;

            }
        })
    }
}