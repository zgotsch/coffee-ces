class Position
    constructor: (@pos = [0, 0]) ->

class StaticSprite
    constructor: (@url = "resources/sun.gif",
                  @pos = [0, 0],
                  @size = [128, 128]) ->

class AnimatedSprite
    constructor: (@url = "resources/sun.gif",
                  @pos = [0, 0],
                  @size = [128, 128],
                  @speed = 1
                  @dir = 'vertical',
                  @once = false,
                  @frameIndices = [0]) ->
        @index = 0

class Velocity
    constructor: (@vector = [0, 0]) ->

class PlayerControl
    constructor: (@playerSpeed=100) ->

class Turnable
    constructor: (@sprites) ->

class CreatedAt
    constructor: () ->
        @createdAt = Date.now()

class StopsAfter
    constructor: (@time = 1000) ->

exports.Position = Position
exports.StaticSprite = StaticSprite
exports.AnimatedSprite = AnimatedSprite
exports.Velocity = Velocity
exports.PlayerControl = PlayerControl
exports.Turnable = Turnable
exports.CreatedAt = CreatedAt
exports.StopsAfter = StopsAfter
