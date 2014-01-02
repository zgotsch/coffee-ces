_ = require 'underscore'
Input = require '../input.coffee'
systems = require '../system.coffee'

class PlayerControlSystem extends systems.BasicSystem
    constructor: ->
        super ['playercontrol', 'velocity']

    action: (entity, dt) ->
        playerSpeed = entity.components.playercontrol.playerSpeed
        if Input.isDown 'LEFT'
            entity.components.velocity.vector[0] = -playerSpeed
        else if Input.isDown 'RIGHT'
            entity.components.velocity.vector[0] = playerSpeed
        else
            entity.components.velocity.vector[0] = 0

        if Input.isDown 'UP'
            entity.components.velocity.vector[1] = -playerSpeed
        else if Input.isDown 'DOWN'
            entity.components.velocity.vector[1] = playerSpeed
        else
            entity.components.velocity.vector[1] = 0


class PhysicsSystem extends systems.BasicSystem
    constructor: ->
        super ['position', 'velocity']

    action: (entity, dt) ->
        position = entity.components.position
        velocity = entity.components.velocity

        position.pos[0] += velocity.vector[0] * dt
        position.pos[1] += velocity.vector[1] * dt


class TurnerSystem extends systems.System
    satisfies: (components) ->
        _.has(components, "turnable") and _.has(components, "velocity") and
            (_.has(components, "staticsprite") or _.has(components, "animatedsprite"))

    action: (entity, dt) ->
        velocity = entity.components.velocity
        turnable = entity.components.turnable

        sprite = null
        if velocity.vector[0] == 0
            if velocity.vector[1] < 0
                sprite = turnable.sprites[0]
            else if velocity.vector[1] > 0
                sprite = turnable.sprites[4]
        else if velocity.vector[0] > 0
            if velocity.vector[1] < 0
                sprite = turnable.sprites[1]
            else if velocity.vector[1] > 0
                sprite = turnable.sprites[3]
        else if velocity.vector[0] < 0
            if velocity.vector[1] < 0
                sprite = turnable.sprites[7]
            else if velocity.vector[1] > 0
                sprite = turnable.sprites[5]
        if velocity.vector[1] == 0
            if velocity.vector[0] > 0
                sprite = turnable.sprites[2]
            if velocity.vector[0] < 0
                sprite = turnable.sprites[6]

        if sprite?
            if _.has entity.components, "staticsprite"
                entity.components.staticsprite = sprite
            if _.has entity.components, "animatedsprite"
                entity.components.animatedsprite = sprite


class StopsAfterSystem extends systems.BasicSystem
    constructor: ->
        super ['velocity', 'createdat', 'stopsafter']

    action: (entity, dt) ->
        if Date.now() - entity.components.createdat.createdAt > entity.components.stopsafter.time
            entity.removeComponent 'stopsafter'
            entity.components.velocity.vector[0] = 0
            entity.components.velocity.vector[1] = 0


exports.PhysicsSystem = PhysicsSystem
exports.PlayerControlSystem = PlayerControlSystem
exports.TurnerSystem = TurnerSystem
exports.StopsAfterSystem = StopsAfterSystem
