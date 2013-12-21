_ = require 'underscore'
Engine = require './engine.coffee'
Input = require './input.coffee'
Renderer = require './renderer.coffee'
Resources = require './resources.coffee'
{"BasicSystem": BasicSystem, "System": System} = require './system.coffee'
components = require './components.coffee'

attachMover = (engine) ->
    mover = new BasicSystem ["positioned", "moving"],
        (components, dt) ->
            components.positioned.pos[0] += components.moving.velocity[0] * dt
            components.positioned.pos[1] += components.moving.velocity[1] * dt

    engine.addSystem mover

attachPlayerController = (engine) ->
    playerController = new BasicSystem ["playercontrolled", "positioned"],
        (components, dt) ->
            playerSpeed = components.playercontrolled.playerSpeed
            if Input.isDown 'LEFT'
                components.positioned.pos[0] += -playerSpeed * dt
            if Input.isDown 'RIGHT'
                components.positioned.pos[0] += playerSpeed * dt
            if Input.isDown 'UP'
                components.positioned.pos[1] += -playerSpeed * dt
            if Input.isDown 'DOWN'
                components.positioned.pos[1] += playerSpeed * dt

    engine.addSystem playerController

createAndTestEngine = (canvas) ->
    Resources.onReady ->
        engine = new Engine()
        renderer = new Renderer(canvas)

        engine.addSystem renderer.system

        engine.beforeTick = renderer.clearCanvas
        engine.afterTick = renderer.drawFramerate

        attachMover engine
        attachPlayerController engine

        e1 = engine.createEntity [
            new components.Renderable(),
            new components.Positioned()
        ]
        e2 = engine.createEntity [
            new components.Renderable(),
            new components.Positioned([200, 200]),
            new components.Moving()
        ]
        e3 = engine.createEntity [
            new components.Renderable(),
            new components.PlayerControlled()
        ]

        engine.start()

        # Two ways to add components
        _.delay (->
            e1.addComponent(new components.Moving())), 2000
        _.delay (->
            _.extend e3.components, {"positioned": new components.Positioned()}
            engine.updateEntity e3.id), 4000

        # Removing components
        _.delay (-> e1.removeComponent "moving"), 10000

        # Deleting entities
        _.delay (-> e2.destroy()), 6000

    Resources.load 'resources/sun.gif'

window.createAndTestEngine = createAndTestEngine
