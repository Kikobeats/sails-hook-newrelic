'use strict';

var path = require('path');
var config = require(path.resolve('config/newrelic')).newrelic;

(function() {
  require('newrelic-config')
  .name(config.app_name)
  .key(config.license_key)
  .log(null, config.logging.level, config.logging.rules.ignore.join(','))
  .profile();
}).call(this);
