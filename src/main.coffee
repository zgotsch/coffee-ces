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
    constructor: ->
        @entities = {}
        @systems = []

        @lastEntityId = 0

    createEntity: (components) ->
        @entities[@lastEntityId] = components
        system.updateCache @lastEntityId, components for system in @systems
        @lastEntityId += 1

    addSystem: (system) ->
        @systems.push system
        system.buildCache @entities

    tick: ->
        system.run @entities for system in @systems

class Positioned
    constructor: (@pos = [0, 0]) ->

class Renderable
    constructor: (@url = "resources/sun.gif",
                  @pos = [0, 0],
                  @size = [128, 128]) ->

class System
    constructor: (@satisfies, @fn) ->
        @cache = []

    buildCache: (entities) ->
        for id, components of entities
            if @satisfies components
                @cache.push(id)

    updateCache: (id, components) ->
        if @satisfies components
            @cache.push(id)

    run: (entities) ->
        for id in @cache
            if _.has entities, id
                @fn entities[id]

attachRenderer = (engine, canvas) ->
    ctx = canvas.getContext '2d'
    renderer = new System(
        (components) ->
            _.has(components, "renderable") and _.has(components, "positioned")
        ,
        (components) ->
            renderable = components?.renderable
            positioned = components?.positioned
            if renderable and positioned
                ctx.drawImage Resources.get(renderable.url),
                            renderable.pos[0], renderable.pos[1],
                            renderable.size[0], renderable.size[1],
                            positioned.pos[0], positioned.pos[1],
                            renderable.size[0], renderable.size[1]
    )
    engine.addSystem renderer

#################

testEngine = (engine) ->
    engine.createEntity {
        "renderable": new Renderable(),
        "positioned": new Positioned()
    }
    engine.createEntity {
        "renderable": new Renderable(),
        "positioned": new Positioned([200, 200])
    }
    engine.createEntity {
        "renderable": new Renderable(),
    }

    engine.tick()






