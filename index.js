'use strict';

var path = require('path');
var config = require(path.resolve('config/newrelic')).newrelic;

module.exports = function(sails) {
  return {
    initialize: function(next) {
      if (sails.config.environment !== 'production') {
        return next();
      }

      sails.newrelic = require('newrelic-config')
        .name(config.app_name)
        .key(config.license_key)
        .log(null, config.logging.level, config.logging.rules.ignore.join(','))
        .profile();

      sails.on('router:route', function(route) {
        if (route.req.options && route.req.options.controller) {
          return sails.newrelic.setControllerName(route.req.options.controller, route.req.options.action);
        }
      });

      sails.log.debug('Sails Hook newrelic :: Loaded configuration');

      return next();
    }
  };
};
