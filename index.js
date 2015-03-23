'use strict';

module.exports = function(sails) {
  return {
    // Pause sails lifting until this hook has completed initializing
    ready: false,
    initialize: function(next) {
      sails.newrelic = global.newrelic;
      delete global.newrelic;
      sails.on('router:route', function(route) {
        if (sails.newRelic && route.req.options && route.req.options.controller) {
          return sails.newrelic.setControllerName(route.req.options.controller, route.req.options.action);
        }
      });
      return next();
    }
  };
};
