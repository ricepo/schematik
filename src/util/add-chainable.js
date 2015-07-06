// -------------------------------------------------------------------------- //
//                                                                            //
// Adds a chainable method to the specified context.                          //
//                                                                            //
// -------------------------------------------------------------------------- //

// Check whether `__proto__` is supported
var hasProtoSupport = '__proto__' in Object;

// Without `__proto__` support, this module will need to add properties to a
// function.
// However, some Function.prototype methods cannot be overwritten,
// and there seems no easy cross-platform way to detect them
// (@see chaijs/chai/issues/69).
var excludeNames = /^(?:length|name|arguments|caller)$/;


export default function(context, name, method, accessor) {

  if (typeof accessor !== 'function') { accessor = () => { }; }
  var chainable = {
    method:   method,
    accessor: accessor
  };

  // Store chainable methods
  if (!context.__methods) { context.__methods = { }; }
  context.__methods[name] = chainable;

  // Attach the chainable to the context object
  Object.defineProperty(context, name, {

    get: function() {
      chainable.accessor.call(this);

      var callback = function() {
        
      };

    }

  });


}
