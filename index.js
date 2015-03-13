'use strict';

module.exports = function(sails) {
  return {
    initialize: function(next) {
      sails.newrelic = newrelic
      sails.on('router:route', function(route) {
        if (route.req.options && route.req.options.controller) {
          return sails.newrelic.setControllerName(route.req.options.controller, route.req.options.action);
        }
      });
      return next();
    }
  };
};
