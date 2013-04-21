(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  // Application bootstrapper.
  Application = {
      initialize: function() {
          
          var HomeView = require('views/home_view')
            , Router   = require('lib/router')
          
          this.homeView = new HomeView()
          this.router   = new Router()
          
          if (typeof Object.freeze === 'function') Object.freeze(this)
          
      }
  }

  module.exports = Application
  
});
window.require.register("initialize", function(exports, require, module) {
  var application = require('application')

  $(function() {
      application.initialize()
      Backbone.history.start()
  })
  
});
window.require.register("lib/router", function(exports, require, module) {
  var application = require('application')

  module.exports = Backbone.Router.extend({
      routes: {
          '': 'home'
      },
      
      home: function() {
          $('body').html(application.homeView.render().el)
      }
  })
  
});
window.require.register("lib/view_helper", function(exports, require, module) {
  // Put handlebars.js helpers here
  
});
window.require.register("models/collection", function(exports, require, module) {
  // Base class for all collections
  module.exports = Backbone.Collection.extend({
      
  })
  
});
window.require.register("models/model", function(exports, require, module) {
  // Base class for all models
  module.exports = Backbone.Model.extend({
      
  })
  
});
window.require.register("views/home_view", function(exports, require, module) {
  var View     = require('./view')
    , template = require('./templates/home')

  module.exports = View.extend({
      id: 'home-view',
      template: template
  })
  
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "\n<canvas class=\"blur\" data-src=\"/images/backgrounds/\"></canvas>\n\n<!-- NAVBAR\n    ================================================== -->\n    <div class=\"navbar-wrapper\">\n      <!-- Wrap the .navbar in .container to center it within the absolutely positioned parent. -->\n      <div class=\"container\">\n\n        <div class=\"navbar navbar-inverse\">\n          <div class=\"navbar-inner\">\n            <!-- Responsive Navbar Part 1: Button for triggering responsive navbar (not covered in tutorial). Include responsive CSS to utilize. -->\n            <button type=\"button\" class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\n              <span class=\"icon-bar\"></span>\n              <span class=\"icon-bar\"></span>\n              <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"brand\" href=\"#\">Widgets</a>\n            <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->\n            <div class=\"nav-collapse collapse\">\n              <ul class=\"nav\">\n                <li class=\"active\"><a href=\"#\">Home</a></li>\n                <li><a href=\"#about\">About</a></li>\n                <li><a href=\"#contact\">Contact</a></li>\n                <!-- Read about Bootstrap dropdowns at http://twitter.github.com/bootstrap/javascript.html#dropdowns -->\n                <li class=\"dropdown\">\n                  <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Widgets <b class=\"caret\"></b></a>\n                  <ul class=\"dropdown-menu\">\n                    <li><a href=\"#\"><i class=\"icon-plus-sign\"></i> Add</a></li>\n                    <li><a href=\"#\">Another action</a></li>\n                    <li><a href=\"#\">Something else here</a></li>\n                    <li class=\"divider\"></li>\n                    <li class=\"nav-header\">Nav header</li>\n                    <li><a href=\"#\">Separated link</a></li>\n                    <li><a href=\"#\">One more separated link</a></li>\n                  </ul>\n                </li>\n              </ul>\n            </div><!--/.nav-collapse -->\n          </div><!-- /.navbar-inner -->\n        </div><!-- /.navbar -->\n\n      </div> <!-- /.container -->\n    </div><!-- /.navbar-wrapper -->\n\n\n<div class=\"container widget-main\">\n	<div class=\"row-fluid\">\n		<div class=\"span4 well\">\n			<h2>Heading</h2>\n			<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n			<p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n		</div>\n		<div class=\"span4 well\">\n			<h2>Heading</h2>\n			<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n			<p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n		</div>\n		<div class=\"span4 well\">\n			<h2>Heading</h2>\n			<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n			<p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n		</div>\n\n	</div>\n	<div class=\"row-fluid\">\n		<div class=\"span4 well\">\n			<h2>Heading</h2>\n			<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n			<p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n		</div>\n		<div class=\"span4 well\">\n			<h2>Heading</h2>\n			<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n			<p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n		</div>\n		<div class=\"span4 well\">\n			<h2>Heading</h2>\n			<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n			<p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n		</div>\n\n	</div>\n	<div class=\"row-fluid\">\n		<div class=\"span4 well\">\n			<h2>Heading</h2>\n			<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n			<p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n		</div>\n		<div class=\"span4 well\">\n			<h2>Heading</h2>\n			<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n			<p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n		</div>\n		<div class=\"span4 well\">\n			<h2>Heading</h2>\n			<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n			<p><a class=\"btn\" href=\"#\">View details &raquo;</a></p>\n		</div>\n\n	</div>\n</div>\n\n<script>\n	(function($) {\n		/**\n		 * Light layer on top of a canvas element to represent an image displayed\n		 * within.  Pass in a canvas element and an Image object and you'll see the\n		 * image within the canvas element.  Use the provided methods (e.g. blur) to\n		 * manipulate it.\n		 *\n		 * @constructor\n		 * @param {HTMLElement} element HTML canvas element.\n		 * @param {Image} image Image object.\n		 */\n		var CanvasImage = function(element, image) {\n			this.image = image;\n			this.element = element;\n			this.element.width = this.image.width;\n			this.element.height = this.image.height;\n			this.context = this.element.getContext(\"2d\");\n			this.context.drawImage(this.image, 0, 0);\n		};\n\n		CanvasImage.prototype = {\n			/**\n			 * Runs a blur filter over the image.\n			 *\n			 * @param {int} strength Strength of the blur.\n			 */\n			blur: function (strength) {\n				this.context.globalAlpha = 0.5; // Higher alpha made it more smooth\n				// Add blur layers by strength to x and y\n				// 2 made it a bit faster without noticeable quality loss\n				for (var y = -strength; y <= strength; y += 2) {\n					for (var x = -strength; x <= strength; x += 2) {\n						// Apply layers\n						this.context.drawImage(this.element, x, y);\n						// Add an extra layer, prevents it from rendering lines\n						// on top of the images (does makes it slower though)\n						if (x>=0 && y>=0) {\n							this.context.drawImage(this.element, -(x-1), -(y-1));\n						}\n					}\n				}\n				this.context.globalAlpha = 1.0;\n			}\n		};\n\n		/**\n		 * Initialise an image on the page and blur it.\n		 */\n\n		var canvas_el = $('canvas.blur');\n		var photo_pool = 6;\n\n		if (canvas_el.length) {\n			var url = canvas_el.attr('data-src') + Math.floor((Math.random()*photo_pool)+1) + '.jpg',\n				image,\n				canvasImage;\n				console.log(url);\n\n			image = new Image();\n			image.onload = function () {\n\n				canvasImage = new CanvasImage(canvas_el[0], this);\n				try{console.time('blur_4');}catch(err){}\n				canvasImage.blur(4);\n				try{console.timeEnd('blur_4');}catch(err){}\n			};\n			image.src = url;\n		}\n	})(jQuery);\n</script>";
    });
});
window.require.register("views/view", function(exports, require, module) {
  require('lib/view_helper')

  // Base class for all views
  module.exports = Backbone.View.extend({
      
      initialize: function(){
          this.render = _.bind(this.render, this)
      },
      
      template: function(){},
      getRenderData: function(){},
      
      render: function(){
          this.$el.html(this.template(this.getRenderData()))
          this.afterRender()
          return this
      },
      
      afterRender: function(){}
      
  })
  
});
