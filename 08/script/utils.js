export function drawText(context, input, currentState) {
    context.font = '20px Asia'
    context.fillText('Last Key is: ' + input, 50, 50)
    context.fillText('Current State is: ' + currentState, 50, 100 )
}