_ = require 'underscore'

class BasicSystem
    constructor: (@requiredComponents, @fn) ->
        @cache = {}
        @satisfies = (components) ->
            _.every @requiredComponents, (required) -> _.has components, required

    buildCache: (entities) ->
        for id, components of entities
            if @satisfies components
                @cache[id] = true

    updateCache: (id, components) ->
        # if components is null, we need to delete the entity
        if components == null or !@satisfies components
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

exports.BasicSystem = BasicSystem
exports.System = System
