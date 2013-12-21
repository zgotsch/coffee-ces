_ = require 'underscore'

Resources = do ->
    resources = {}
    callbacks = []

    ready = -> _.all _.values(resources)

    load = (url) ->
        if resources[url]
            return resources[url]
        else
            img = new Image()
            img.onload = ->
                resources[url] = img
                if ready()
                    cb() for cb in callbacks
            resources[url] = false
            img.src = url

    get = (url) -> resources[url]

    onReady = (callback) ->
        callbacks.push callback
        if ready() and ! _.isEmpty resources
            callback()

    {
        load: load,
        get: get,
        onReady: onReady
    }

module.exports = Resources
