let action = 'idle'

let actions = document.getElementById('actions')
actions.addEventListener('change', e => {
    action = e.target.value
})

const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width = 600
const HEIGHT = canvas.height = 600

const image = new Image();
image.src = 'dog.png'

const dogWidth = 575
const dogHeight = 523

let frameX = 0
let frameY = 0
let gameFrame = 0
let interval = 5

const dogObjects = {}
const dogFrames = [
    {
        name: 'idle',
        frame: 7
    },
    {
        name: 'jumpUp',
        frame: 7
    },
    {
        name: 'jumpDown',
        frame: 7
    },
    {
        name: 'run',
        frame: 9
    },
    {
        name: 'faint',
        frame: 11
    },
    {
        name: 'fly',
        frame: 5
    },
    {
        name: 'roll',
        frame: 7
    },
    {
        name: 'sprint',
        frame: 7
    },
    {
        name: 'trip',
        frame: 12
    },
    {
        name: 'pant',
        frame: 4
    }
]

dogFrames.forEach((state, index) => {
    let frame = {
        loc: []
    }
    for (let x = 0; x < state.frame; x++) {
        frame.loc.push({
            x: x * dogWidth,
            y: index * dogHeight
        })
    }
    dogObjects[state.name] = frame
})

console.log(dogObjects);

function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.drawImage(image, frameX , frameY , dogWidth, dogHeight, 0, 0, dogWidth, dogHeight)
    let nowAction = dogObjects[action]
    let position = Math.floor(gameFrame / interval) % nowAction.loc.length
    frameX = nowAction.loc[position].x
    frameY = nowAction.loc[position].y    
    gameFrame ++;
    requestAnimationFrame(animate)
}

animate()