_ = require 'underscore'
Engine = require './engine.coffee'
Renderer = require './renderer.coffee'
Resources = require './resources.coffee'
components = require './components.coffee'
demoSystems = require './systems/demo.coffee'

createEngine = (canvas) ->
    engine = new Engine()
    renderer = new Renderer(canvas)

    engine.addSystem renderer.system

    engine.beforeTick = renderer.clearCanvas
    engine.afterTick = renderer.drawFramerate

    engine.addSystem new demoSystems.PhysicsSystem()
    engine.addSystem new demoSystems.PlayerControlSystem()
    engine.addSystem new demoSystems.TurnerSystem()
    engine.addSystem new demoSystems.StopsAfterSystem()

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
            new components.Position(),
        ]
    ,
    createMovingEntity: (engine) ->
        entity = engine.createEntity [
            new components.StaticSprite(),
            new components.Position([0, 150]),
            new components.Velocity([10, 10])
        ]
    ,
    createAnimatedEntity: (engine) ->
        entity = engine.createEntity [
            new components.AnimatedSprite('resources/dragonsprites.gif',
                [0, 0], [75, 70], 10, 'horiz', false,
                [0, 1, 2, 3, 4, 5, 6, 7, 8]),
            new components.Position([0, 300]),
        ]
    ,
    createPlayerControlledEntity: (engine) ->
        entity = engine.createEntity [
            new components.Position([250, 0]),
            new components.StaticSprite()
            new components.PlayerControl(),
            new components.Velocity()
        ]
    ,
    createTurnableEntity: (engine) ->
        entity = engine.createEntity [
            new components.Position([250, 250]),
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
            new components.PlayerControl(),
            new components.Velocity()
        ]
    ,
    addRemoveComponents: (engine) ->
        entity = engine.createEntity [
            new components.Position([0, 200]),
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
            new components.Position([0, 500]),
            new components.Velocity([10, 0]),
            new components.CreatedAt(),
            new components.StopsAfter(10 * 1000),
            new components.StaticSprite()
        ]
}

window.createEngine = createEngine
