_ = require 'underscore'

class BasicSystem
    constructor: (@requiredComponents, @fn) ->
        @cache = {}
        @satisfies = (components) ->
            _.every @requiredComponents, (required) -> _.has components, required

    buildCache: (entities) ->
        @cache = {}
        for id, components of entities
            @updateCache id, components

    updateCache: (id, components) ->
        # if components is falsey, we need to delete the entity
        if !components or !@satisfies components
            if _.has @cache, id
                delete @cache[id]
        else
            @cache[id] = true

    run: (entities, dt) ->
        idsToUpdate = []
        for id in _.keys @cache
            if _.has entities, id
                needsUpdate = @fn entities[id], dt
                if needsUpdate
                    idsToUpdate.push id
        return idsToUpdate

class System extends BasicSystem
    constructor: (@satisfies, @fn) ->
        @cache = {}

class CompsiteSystem extends BasicSystem
    constructor: (@systems...) ->
        @fn = (components, dt) ->
            system.fn components, dt for system in @systems

    buildCache: (entities) ->
        system.buildCache entities for system in @systems

    updateCache: (id, components) ->
        system.updateCache id, components for system in @systems

    run: (entities, dt) ->
        # We have to do some redundant work here to make sure we're doing the
        # right thing. Each system must update due to changes from all the
        # previous system runs, even though the engine will sync all systems
        # once this run returns.
        idsToUpdate = []
        for system in @systems
            system.updateCache id, entities[id] for id in idsToUpdate
            newIdsToUpdate = system.run entities, dt
            idsToUpdate = idsToUpdate.concat newIdsToUpdate
        return idsToUpdate

exports.BasicSystem = BasicSystem
exports.System = System
exports.CompsiteSystem = CompsiteSystem
