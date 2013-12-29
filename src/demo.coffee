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

attachStopsAfter = (engine) ->
    stopsAfter = new BasicSystem ["velocity", "createdat", "stopsafter"], (components, dt) ->
        if Date.now() - components.createdat.createdAt > components.stopsafter.time
            delete components.stopsafter
            components.velocity.vector[0] = 0
            components.velocity.vector[1] = 0
            return true

    engine.addSystem stopsAfter

createEngine = (canvas) ->
    engine = new Engine()
    renderer = new Renderer(canvas)

    engine.addSystem renderer.system

    engine.beforeTick = renderer.clearCanvas
    engine.afterTick = renderer.drawFramerate

    attachPhysics engine
    attachPlayerController engine
    attachTurner engine
    attachStopsAfter engine

    Resources.onReady ->
        engine.start()

    Resources.load ['resources/sun.gif', 'resources/dragonsprites.gif']

    return engine

window.demo = {
    createEngine: createEngine,
    resetEngine: (engine) ->
        engine.reset()
    ,
    createSpriteEntity: (engine) ->
        entity = engine.createEntity [
            new components.StaticSprite(),
            new components.Positioned(),
        ]
    ,
    createMovingEntity: (engine) ->
        entity = engine.createEntity [
            new components.StaticSprite(),
            new components.Positioned([0, 150]),
            new components.Velocity([10, 10])
        ]
    ,
    createAnimatedEntity: (engine) ->
        entity = engine.createEntity [
            new components.AnimatedSprite('resources/dragonsprites.gif',
                [0, 0], [75, 70], 10, 'horiz', false,
                [0, 1, 2, 3, 4, 5, 6, 7, 8]),
            new components.Positioned([0, 300]),
        ]
    ,
    createPlayerControlledEntity: (engine) ->
        entity = engine.createEntity [
            new components.Positioned([250, 0]),
            new components.StaticSprite()
            new components.PlayerControlled(),
            new components.Velocity()
        ]
    ,
    createTurnableEntity: (engine) ->
        entity = engine.createEntity [
            new components.Positioned([250, 250]),
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
    ,
    addRemoveComponents: (engine) ->
        entity = engine.createEntity [
            new components.Positioned([0, 200]),
            new components.StaticSprite()
        ]
        # Two ways to add components
        _.delay (->
            entity.addComponent(new components.Velocity([10, 0]))), 3000
        _.delay (->
            _.extend entity.components, {"animatedsprite": 
                new components.AnimatedSprite('resources/dragonsprites.gif',
                    [0, 0], [75, 70], 10, 'horiz', false,
                    [0, 1, 2, 3, 4, 5, 6, 7, 8])}
            engine.updateEntity entity.id), 8000

        # Two ways to remove components
        _.delay (-> entity.removeComponent "velocity"), 7000
        _.delay (->
            delete entity.components["staticsprite"]
            engine.updateEntity entity.id), 13000
    ,
    systemModification: (engine) ->
        entity = engine.createEntity [
            new components.Positioned([0, 500]),
            new components.Velocity([10, 0]),
            new components.CreatedAt(),
            new components.StopsAfter(10 * 1000),
            new components.StaticSprite()
        ]
}

window.createEngine = createEngine
