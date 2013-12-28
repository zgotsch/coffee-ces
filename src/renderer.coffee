_ = require 'underscore'
Resources = require './resources.coffee'
{ "BasicSystem": BasicSystem, "System": System, "CompsiteSystem": CompsiteSystem } = require './system.coffee'
util = require './util.coffee'

class Renderer
    constructor: (canvas) ->
        @canvas = canvas
        @ctx = canvas.getContext '2d'

        staticRenderingSystem = new BasicSystem ['positioned', 'staticsprite'], (components, dt) =>
            positioned = components.positioned
            staticSprite = components.staticsprite

            @ctx.drawImage Resources.get(staticSprite.url),
                            staticSprite.pos[0], staticSprite.pos[1],
                            staticSprite.size[0], staticSprite.size[1],
                            positioned.pos[0], positioned.pos[1],
                            staticSprite.size[0], staticSprite.size[1]

        animatedRenderingSystem = new BasicSystem ['positioned', 'animatedsprite'], (components, dt) =>
            positioned = components.positioned
            animatedSprite = components.animatedsprite

            if animatedSprite.speed > 0
                idx = Math.floor(
                    animatedSprite.index += animatedSprite.speed * dt)
                max = animatedSprite.frameIndices.length
                frameIndex = animatedSprite.frameIndices[idx % max]

                if animatedSprite.once and idx > max
                    animatedSprite.done = true
                    # Don't draw
                    return
            else
                frameIndex = 0

            spritePosition = animatedSprite.pos.slice()
            xySwitch = if animatedSprite.dir == 'vertical' then 1 else 0
            spritePosition[xySwitch] +=
                frameIndex * animatedSprite.size[xySwitch]

            @ctx.drawImage Resources.get(animatedSprite.url),
                spritePosition[0], spritePosition[1],
                animatedSprite.size[0], animatedSprite.size[1],
                positioned.pos[0], positioned.pos[1]
                animatedSprite.size[0], animatedSprite.size[1]

        @system = new CompsiteSystem staticRenderingSystem, animatedRenderingSystem

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
