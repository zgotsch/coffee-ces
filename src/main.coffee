_ = require 'underscore'
Engine = require './engine.coffee'
Input = require './input.coffee'
Renderer = require './renderer.coffee'
Resources = require './resources.coffee'
{"BasicSystem": BasicSystem, "System": System} = require './system.coffee'
components = require './components.coffee'

attachPlayerController = (engine) ->
    playerController = new BasicSystem ["playercontrolled", "velocity"],
        (components, dt) ->
            playerSpeed = components.playercontrolled.playerSpeed
            if Input.isDown 'LEFT'
                components.velocity.vector[0] = -playerSpeed
            else if Input.isDown 'RIGHT'
                components.velocity.vector[0] = playerSpeed
            else
                components.velocity.vector[0] = 0

            if Input.isDown 'UP'
                components.velocity.vector[1] = -playerSpeed
            else if Input.isDown 'DOWN'
                components.velocity.vector[1] = playerSpeed
            else
                components.velocity.vector[1] = 0

    engine.addSystem playerController

attachPhysics = (engine) ->
    physics = new BasicSystem ["positioned", "velocity"], (components, dt) ->
        components.positioned.pos[0] += components.velocity.vector[0] * dt
        components.positioned.pos[1] += components.velocity.vector[1] * dt
    engine.addSystem physics

attachTurner = (engine) ->
    turner = new System(
        (components) ->
            _.has(components, "turnable") and _.has(components, "velocity") and
                (_.has(components, "staticsprite") or _.has(components, "animatedsprite"))
        ,
        (components, dt) ->
            sprite = null
            if components.velocity.vector[0] == 0
                if components.velocity.vector[1] < 0
                    sprite = components.turnable.sprites[0]
                else if components.velocity.vector[1] > 0
                    sprite = components.turnable.sprites[4]
            else if components.velocity.vector[0] > 0
                if components.velocity.vector[1] < 0
                    sprite = components.turnable.sprites[1]
                else if components.velocity.vector[1] > 0
                    sprite = components.turnable.sprites[3]
            else if components.velocity.vector[0] < 0
                if components.velocity.vector[1] < 0
                    sprite = components.turnable.sprites[7]
                else if components.velocity.vector[1] > 0
                    sprite = components.turnable.sprites[5]
            if components.velocity.vector[1] == 0
                if components.velocity.vector[0] > 0
                    sprite = components.turnable.sprites[2]
                if components.velocity.vector[0] < 0
                    sprite = components.turnable.sprites[6]

            if sprite?
                if _.has components, "staticsprite"
                    components.staticsprite = sprite
                if _.has components, "animatedsprite"
                    components.animatedsprite = sprite

    )
    engine.addSystem turner


createAndTestEngine = (canvas) ->
    Resources.onReady ->
        engine = new Engine()
        renderer = new Renderer(canvas)

        engine.addSystem renderer.system

        engine.beforeTick = renderer.clearCanvas
        engine.afterTick = renderer.drawFramerate

        attachPhysics engine
        attachPlayerController engine
        attachTurner engine

        e1 = engine.createEntity [
            new components.StaticSprite(),
            new components.Positioned()
        ]
        e2 = engine.createEntity [
            new components.StaticSprite(),
            new components.Positioned([200, 200]),
            new components.Velocity([10, 10])
        ]
        e3 = engine.createEntity [
            new components.AnimatedSprite('resources/dragonsprites.gif',
                [0, 0], [75, 70], 10, 'horiz', false,
                [0, 1, 2, 3, 4, 5, 6, 7, 8]),
            new components.Turnable([
                new components.AnimatedSprite 'resources/dragonsprites.gif',
                    [0, 6 * 70], [75, 70], 10, 'horiz', false,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                new components.AnimatedSprite 'resources/dragonsprites.gif',
                    [0, 7 * 70], [75, 70], 10, 'horiz', false,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                new components.AnimatedSprite 'resources/dragonsprites.gif',
                    [0, 0 * 70], [75, 70], 10, 'horiz', false,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                new components.AnimatedSprite 'resources/dragonsprites.gif',
                    [0, 1 * 70], [75, 70], 10, 'horiz', false,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                new components.AnimatedSprite 'resources/dragonsprites.gif',
                    [0, 2 * 70], [75, 70], 10, 'horiz', false,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                new components.AnimatedSprite 'resources/dragonsprites.gif',
                    [0, 3 * 70], [75, 70], 10, 'horiz', false,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                new components.AnimatedSprite 'resources/dragonsprites.gif',
                    [0, 4 * 70], [75, 70], 10, 'horiz', false,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8],
                new components.AnimatedSprite 'resources/dragonsprites.gif',
                    [0, 5 * 70], [75, 70], 10, 'horiz', false,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8]])
            new components.PlayerControlled(),
            new components.Velocity()
        ]

        engine.start()

        # Two ways to add components
        _.delay (->
            e1.addComponent(new components.Velocity([10, 10]))), 2000
        _.delay (->
            _.extend e3.components, {"positioned": new components.Positioned()}
            engine.updateEntity e3.id), 4000

        # Removing components
        _.delay (-> e1.removeComponent "moving"), 10000

        # Deleting entities
        _.delay (-> e2.destroy()), 6000

    Resources.load ['resources/sun.gif', 'resources/dragonsprites.gif']

window.createAndTestEngine = createAndTestEngine
