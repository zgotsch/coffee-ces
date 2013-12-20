sum = (list) ->
    _.foldl list, ((s, x) -> s + x), 0

average = (list) ->
    sum(list) / list.length

# ========================

Resources = do ->
    resources = {}
    callbacks = []

    ready = -> _.all _.values(resources)

    load = (url) ->
        if resources[url]
            return resources[url]
        else
            img = new Image()
            img.onload = ->
                resources[url] = img
                if ready()
                    cb() for cb in callbacks
            resources[url] = false
            img.src = url

    get = (url) -> resources[url]

    onReady = (callback) ->
        callbacks.push callback
        if ready() and ! _.isEmpty resources
            callback()

    {
        load: load,
        get: get,
        onReady: onReady
    }

class Engine
    keyForComponent = (component) ->
        component.constructor.name.toLowerCase()

    constructor: ->
        @entities = {}
        @systems = []

        @lastEntityId = 0

        @running = false
        @lastFrameTime = null

    createEntity: (components) ->
        # there has to be a prettier way to do this
        componentsObject = {}
        componentsObject[keyForComponent(c)] = c for c in components

        id = @lastEntityId
        @entities[id] = componentsObject
        system.updateCache id, componentsObject for system in @systems
        @lastEntityId += 1

        entity = {"id": id, "components": componentsObject}

    updateEntity: (id) ->
        # This needs to be called or the systems' caches won't be updated
        components = @entities[id]
        system.updateCache id, components for system in @systems

    addComponent: (id, component) ->
        componentObject = {}
        componentObject[keyForComponent(component)] = component
        _.extend @entities[id], componentObject
        @updateEntity id

    addSystem: (system) ->
        @systems.push system
        system.buildCache @entities

    tick: (dt) ->
        system.run @entities, dt for system in @systems

    start: ->
        @running = true
        @lastFrameTime = null
        requestAnimationFrame @gameLoop

    gameLoop: (paintTime) =>
        if @lastFrameTime == null
            @lastFrameTime = paintTime
            requestAnimationFrame @gameLoop
        else
            dt = (paintTime - @lastFrameTime) / 1000.0
            @lastFrameTime = paintTime

            @beforeTick?(dt)
            @tick dt
            @afterTick?(dt)

            requestAnimationFrame @gameLoop if @running

class Positioned
    constructor: (@pos = [0, 0]) ->

class Renderable
    constructor: (@url = "resources/sun.gif",
                  @pos = [0, 0],
                  @size = [128, 128]) ->

class System
    constructor: (@satisfies, @fn) ->
        @cache = {}

    buildCache: (entities) ->
        for id, components of entities
            if @satisfies components
                @cache[id] = true

    updateCache: (id, components) ->
        if @satisfies components
            @cache[id] = true
        else
            if _.has @cache, id
                delete @cache[id]


    run: (entities, dt) ->
        for id in _.keys @cache
            if _.has entities, id
                @fn entities[id], dt

class Renderer
    constructor: (canvas) ->
        @canvas = canvas
        @ctx = canvas.getContext '2d'
        @system = new System(
            (components) ->
                _.has(components, "renderable") and _.has(components, "positioned")
            ,
            (components, dt) =>
                renderable = components?.renderable
                positioned = components?.positioned
                if renderable and positioned
                    @ctx.drawImage Resources.get(renderable.url),
                                  renderable.pos[0], renderable.pos[1],
                                  renderable.size[0], renderable.size[1],
                                  positioned.pos[0], positioned.pos[1],
                                  renderable.size[0], renderable.size[1]
            )
        @clearCanvas = (dt) =>
            @ctx.fillStyle = "lightgrey"
            @ctx.fillRect 0, 0, @canvas.width, @canvas.height

        @drawFramerate = (dt) =>
            @updateAndDrawFramerate dt if @showFramerate

        @framerates = []
        @showFramerate = true

    toggleFramerate: ->
        @showFramerate = !@showFramerate

    updateAndDrawFramerate: (dt) ->
        drawFramerate = =>
            @ctx.save()
            @ctx.fillStyle = "black"
            @ctx.font = "30px sans-serif"
            @ctx.fillText average(@framerates).toFixed(1), 50, 50
            @ctx.restore()
        @framerates.push(1/dt)
        while @framerates.length > 10
            @framerates.shift()
        drawFramerate()


class Moving
    constructor: (@velocity = [10, 10]) ->

attachMover = (engine) ->
    mover = new System(
        (components) ->
            _.has(components, "positioned") and _.has(components, "moving")
        ,
        (components, dt) ->
            components.positioned.pos[0] += components.moving.velocity[0] * dt
            components.positioned.pos[1] += components.moving.velocity[1] * dt
    )
    engine.addSystem mover

#################

testEngine = (engine) ->
    e1 = engine.createEntity [
        new Renderable(),
        new Positioned()
    ]
    e2 = engine.createEntity [
        new Renderable(),
        new Positioned([200, 200]),
        new Moving()
    ]
    e3 = engine.createEntity [
        new Renderable(),
    ]

    engine.start()

    _.delay (->
        engine.addComponent(e1.id, new Moving())), 2000
    _.delay (->
        _.extend e3.components, {"positioned": new Positioned()}
        engine.updateEntity e3.id), 4000
