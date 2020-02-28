
import DomManager from '../util/dom-manager.js'

/**
 * Lib do manager game main features
 * @param {*} width 
 * @param {*} height 
 */
export default function Game(width = 480, height = 270) {

    // game components to call update and draw
    let components = []
    let canvas
    let context
    let interval

    init()

    function initDOM() {

        const dom = DomManager()


        let content = dom.create('div', {id: 'content'})
        let canvas = content.create('canvas', {id: 'content-game', width: 800, height: 600})
        let panel = content.create('div', {id: 'info-panel'})
        let p = panel.create('p', {id: 'player-position'})
        
        let content = dom.create('div', null, null, { id: 'content' })
        canvas = dom.create('canvas', content, null, { id: 'content-game', width, height })
        let infoPanel = dom.create('div', content, null, { id: 'info-panel' })
        let playerPosition = dom.create('p', infoPanel, "Player Position: <span id='player-position-value'>(0,0)</span>", { id: 'player-position' })

        dom.insertBefore(content, dom.getFirst('body'))

        context = canvas.getContext('2d')
    }

    function init() {
        // init general variables
        initDOM()

        interval = setInterval(updateGame, 20)
    }

    function stop() {
        clearInterval(interval)
    }

    function checkCollisions(component) {
        components.forEach(
            current => {
                if (component.id != current.id &&
                    component.collisionWith(current)) {

                }
            }
        )
    }

    function updateGame() {
        components.forEach(
            c => {
                c.update()
                // check collisions?
                checkCollisions(c)
            }
        )

        drawGame()
    }

    function drawGame() {

        // temp
        context.clearRect(0, 0, canvas.width, canvas.height)

        components.forEach(
            c => c.draw()
        )
    }

    function addComponent(component) {
        // check if exists before add
        component.id = components.length + 1
        component.init(this)
        components.push(component)
    }

    function removeComponent(component) {
        if (!component.id) return

        components.splice(component.id, 1)
    }

    function getContext() {
        return context
    }

    function getCanvas() {
        return canvas
    }

    return {
        addComponent,
        removeComponent,
        getCanvas,
        getContext
    }
}

