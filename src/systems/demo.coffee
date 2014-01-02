_ = require 'underscore'
Input = require '../input.coffee'
systems = require '../system.coffee'

class PlayerControlSystem extends systems.BasicSystem
    constructor: ->
        super ['playercontrol', 'velocity']

    action: (components, dt) ->
        playerSpeed = components.playercontrol.playerSpeed
        if Input.isDown 'LEFT'
            components.velocity.vector[0] = -playerSpeed
        else if Input.isDown 'RIGHT'
            components.velocity.vector[0] = playerSpeed
        else
            components.velocity.vector[0] = 0

        if Input.isDown 'UP'
            components.velocity.vector[1] = -playerSpeed
        else if Input.isDown 'DOWN'
            components.velocity.vector[1] = playerSpeed
        else
            components.velocity.vector[1] = 0


class PhysicsSystem extends systems.BasicSystem
    constructor: ->
        super ['position', 'velocity']

    action: (components, dt) ->
        components.position.pos[0] += components.velocity.vector[0] * dt
        components.position.pos[1] += components.velocity.vector[1] * dt


class TurnerSystem extends systems.System
    satisfies: (components) ->
        _.has(components, "turnable") and _.has(components, "velocity") and
            (_.has(components, "staticsprite") or _.has(components, "animatedsprite"))

    action: (components, dt) ->
        sprite = null
        if components.velocity.vector[0] == 0
            if components.velocity.vector[1] < 0
                sprite = components.turnable.sprites[0]
            else if components.velocity.vector[1] > 0
                sprite = components.turnable.sprites[4]
        else if components.velocity.vector[0] > 0
            if components.velocity.vector[1] < 0
                sprite = components.turnable.sprites[1]
            else if components.velocity.vector[1] > 0
                sprite = components.turnable.sprites[3]
        else if components.velocity.vector[0] < 0
            if components.velocity.vector[1] < 0
                sprite = components.turnable.sprites[7]
            else if components.velocity.vector[1] > 0
                sprite = components.turnable.sprites[5]
        if components.velocity.vector[1] == 0
            if components.velocity.vector[0] > 0
                sprite = components.turnable.sprites[2]
            if components.velocity.vector[0] < 0
                sprite = components.turnable.sprites[6]

        if sprite?
            if _.has components, "staticsprite"
                components.staticsprite = sprite
            if _.has components, "animatedsprite"
                components.animatedsprite = sprite


class StopsAfterSystem extends systems.BasicSystem
    constructor: ->
        super ['velocity', 'createdat', 'stopsafter']

    action: (components, dt) ->
        if Date.now() - components.createdat.createdAt > components.stopsafter.time
            delete components.stopsafter
            components.velocity.vector[0] = 0
            components.velocity.vector[1] = 0
            return true


exports.PhysicsSystem = PhysicsSystem
exports.PlayerControlSystem = PlayerControlSystem
exports.TurnerSystem = TurnerSystem
exports.StopsAfterSystem = StopsAfterSystem
