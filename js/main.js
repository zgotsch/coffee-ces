// Generated by CoffeeScript 1.6.2
var Engine, Moving, Positioned, Renderable, Resources, System, attachMover, attachRenderer, testEngine,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Resources = (function() {
  var callbacks, get, load, onReady, ready, resources;

  resources = {};
  callbacks = [];
  ready = function() {
    return _.all(_.values(resources));
  };
  load = function(url) {
    var img;

    if (resources[url]) {
      return resources[url];
    } else {
      img = new Image();
      img.onload = function() {
        var cb, _i, _len, _results;

        resources[url] = img;
        if (ready()) {
          _results = [];
          for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
            cb = callbacks[_i];
            _results.push(cb());
          }
          return _results;
        }
      };
      resources[url] = false;
      return img.src = url;
    }
  };
  get = function(url) {
    return resources[url];
  };
  onReady = function(callback) {
    callbacks.push(callback);
    if (ready() && !_.isEmpty(resources)) {
      return callback();
    }
  };
  return {
    load: load,
    get: get,
    onReady: onReady
  };
})();

Engine = (function() {
  function Engine() {
    this.gameLoop = __bind(this.gameLoop, this);    this.entities = {};
    this.systems = [];
    this.lastEntityId = 0;
    this.running = false;
    this.lastFrameTime = null;
  }

  Engine.prototype.createEntity = function(components) {
    var system, _i, _len, _ref;

    this.entities[this.lastEntityId] = components;
    _ref = this.systems;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      system = _ref[_i];
      system.updateCache(this.lastEntityId, components);
    }
    return this.lastEntityId += 1;
  };

  Engine.prototype.addSystem = function(system) {
    this.systems.push(system);
    return system.buildCache(this.entities);
  };

  Engine.prototype.tick = function(dt) {
    var system, _i, _len, _ref, _results;

    _ref = this.systems;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      system = _ref[_i];
      _results.push(system.run(this.entities, dt));
    }
    return _results;
  };

  Engine.prototype.start = function() {
    this.running = true;
    this.lastFrameTime = null;
    return requestAnimationFrame(this.gameLoop);
  };

  Engine.prototype.gameLoop = function(paintTime) {
    var dt;

    if (this.lastFrameTime === null) {
      this.lastFrameTime = paintTime;
      return requestAnimationFrame(this.gameLoop);
    } else {
      dt = (paintTime - this.lastFrameTime) / 1000.0;
      this.lastFrameTime = paintTime;
      if (typeof this.canvasUpdateFunction === "function") {
        this.canvasUpdateFunction();
      }
      this.tick(dt);
      if (this.running) {
        return requestAnimationFrame(this.gameLoop);
      }
    }
  };

  return Engine;

})();

Positioned = (function() {
  function Positioned(pos) {
    this.pos = pos != null ? pos : [0, 0];
  }

  return Positioned;

})();

Renderable = (function() {
  function Renderable(url, pos, size) {
    this.url = url != null ? url : "resources/sun.gif";
    this.pos = pos != null ? pos : [0, 0];
    this.size = size != null ? size : [128, 128];
  }

  return Renderable;

})();

System = (function() {
  function System(satisfies, fn) {
    this.satisfies = satisfies;
    this.fn = fn;
    this.cache = [];
  }

  System.prototype.buildCache = function(entities) {
    var components, id, _results;

    _results = [];
    for (id in entities) {
      components = entities[id];
      if (this.satisfies(components)) {
        _results.push(this.cache.push(id));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  System.prototype.updateCache = function(id, components) {
    if (this.satisfies(components)) {
      return this.cache.push(id);
    }
  };

  System.prototype.run = function(entities, dt) {
    var id, _i, _len, _ref, _results;

    _ref = this.cache;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      id = _ref[_i];
      if (_.has(entities, id)) {
        _results.push(this.fn(entities[id], dt));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return System;

})();

attachRenderer = function(engine, canvas) {
  var ctx, renderer;

  ctx = canvas.getContext('2d');
  renderer = new System(function(components) {
    return _.has(components, "renderable") && _.has(components, "positioned");
  }, function(components, dt) {
    var positioned, renderable;

    renderable = components != null ? components.renderable : void 0;
    positioned = components != null ? components.positioned : void 0;
    if (renderable && positioned) {
      return ctx.drawImage(Resources.get(renderable.url), renderable.pos[0], renderable.pos[1], renderable.size[0], renderable.size[1], positioned.pos[0], positioned.pos[1], renderable.size[0], renderable.size[1]);
    }
  });
  engine.addSystem(renderer);
  return engine.canvasUpdateFunction = function() {
    ctx.fillStyle = "lightgrey";
    return ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
};

Moving = (function() {
  function Moving(velocity) {
    this.velocity = velocity != null ? velocity : [10, 10];
  }

  return Moving;

})();

attachMover = function(engine) {
  var mover;

  mover = new System(function(components) {
    return _.has(components, "positioned") && _.has(components, "moving");
  }, function(components, dt) {
    components.positioned.pos[0] += components.moving.velocity[0] * dt;
    return components.positioned.pos[1] += components.moving.velocity[1] * dt;
  });
  return engine.addSystem(mover);
};

testEngine = function(engine) {
  engine.createEntity({
    "renderable": new Renderable(),
    "positioned": new Positioned()
  });
  engine.createEntity({
    "renderable": new Renderable(),
    "positioned": new Positioned([200, 200]),
    "moving": new Moving()
  });
  engine.createEntity({
    "renderable": new Renderable()
  });
  return engine.start();
};

/*
//@ sourceMappingURL=main.map
*/
