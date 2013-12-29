util = require './util.coffee'
Entity = require './entity.coffee'

class Engine
    constructor: ->
        @entities = {}
        @systems = []

        @lastEntityId = 0

        @running = false
        @lastFrameTime = null

    createEntity: (components) ->
        # there has to be a prettier way to do this
        componentsObject = {}
        componentsObject[util.keyForComponent(c)] = c for c in components

        id = @lastEntityId
        @entities[id] = componentsObject
        system.updateCache id, componentsObject for system in @systems
        @lastEntityId += 1

        return new Entity id, componentsObject, this

    updateEntity: (id) ->
        # This needs to be called or the systems' caches won't be updated
        components = @entities[id]
        system.updateCache id, components for system in @systems

    addSystem: (system) ->
        @systems.push system
        system.buildCache @entities

    tick: (dt) ->
        for system in @systems
            idsToUpdate = system.run @entities, dt
            @updateEntity id for id in idsToUpdate

    removeDeadEntities: ->
        for id, components of @entities
            if components.destroy?
                delete @entities[id]
                system.updateCache id, null for system in @systems

    start: ->
        @running = true
        @lastFrameTime = null
        requestAnimationFrame @gameLoop

    reset: ->
        # Not sure if the cancel and rerequest is necessary, otherwise it's
        # sufficient to just reset @entities
        if @rafId?
            cancelAnimationFrame @rafId
        @entities = {}
        system.buildCache for system in @systems
        @start()

    gameLoop: (paintTime) =>
        if @lastFrameTime == null
            @lastFrameTime = paintTime
        else
            dt = (paintTime - @lastFrameTime) / 1000.0
            @lastFrameTime = paintTime

            @beforeTick?(dt)
            @tick dt
            @removeDeadEntities()
            @afterTick?(dt)

        @rafId = requestAnimationFrame @gameLoop if @running

module.exports = Engine
