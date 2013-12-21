_ = require 'underscore'
util = require './util.coffee'

class Entity
    constructor: (@id, @components, @engine) ->

    addComponent: (component) ->
        componentObject = {}
        componentObject[util.keyForComponent(component)] = component
        _.extend @components, componentObject
        @engine.updateEntity @id

    removeComponent: (componentName) ->
        if _.has @components, componentName
            delete @components[componentName]
            @engine.updateEntity @id

    destroy: () ->
        @components.destroy = true

module.exports = Entity
