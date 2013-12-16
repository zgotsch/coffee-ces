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
    constructor: (canvas) ->
        @ctx = canvas.getContext '2d'

        @entities = {}
        @systems = []
        @components = {} #master component list for fast lookup

        @lastEntityId = 0

    createEntity: (components) ->
        @entities[@lastEntityId] = components
        @lastEntityId += 1

class Positioned
    constructor: (@pos = [0, 0]) ->

class Renderable
    constructor: (@url = "resources/sun.gif",
                  @pos = [0, 0],
                  @size = [128, 128]) ->

renderer = (ctx, entities) ->
    for id, components of entities
        renderable = components?.renderable
        positioned = components?.positioned
        if renderable and positioned
            # console.log "Rendering #{renderable} at", renderable.pos
            ctx.drawImage Resources.get(renderable.url),
                        renderable.pos[0], renderable.pos[1],
                        renderable.size[0], renderable.size[1],
                        positioned.pos[0], positioned.pos[1],
                        renderable.size[0], renderable.size[1]
        else
            console.log "not drawn: #{id}"


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

    console.log engine.entities
    renderer engine.ctx, engine.entities






