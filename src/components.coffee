class Positioned
    constructor: (@pos = [0, 0]) ->

class Renderable
    constructor: (@url = "resources/sun.gif",
                  @pos = [0, 0],
                  @size = [128, 128]) ->

class Moving
    constructor: (@velocity = [10, 10]) ->

class PlayerControlled
    constructor: (@playerSpeed=100) ->

exports.Positioned = Positioned
exports.Renderable = Renderable
exports.Moving = Moving
exports.PlayerControlled = PlayerControlled
