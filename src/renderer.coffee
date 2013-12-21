_ = require 'underscore'
Resources = require './resources.coffee'
{"BasicSystem": BasicSystem, "System": System} = require './system.coffee'
util = require './util.coffee'

class Renderer
    constructor: (canvas) ->
        @canvas = canvas
        @ctx = canvas.getContext '2d'
        @system = new BasicSystem ["renderable", "positioned"], 
            (components, dt) =>
                renderable = components.renderable
                positioned = components.positioned
                @ctx.drawImage Resources.get(renderable.url),
                                renderable.pos[0], renderable.pos[1],
                                renderable.size[0], renderable.size[1],
                                positioned.pos[0], positioned.pos[1],
                                renderable.size[0], renderable.size[1]

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
            @ctx.fillText util.average(@framerates).toFixed(1), 50, 50
            @ctx.restore()
        @framerates.push(1/dt)
        while @framerates.length > 10
            @framerates.shift()
        drawFramerate()

module.exports = Renderer
