'use strict';

var path = require('path');
var env = process.env.NODE_ENV;
if(!env){
  env = 'development';
}
var configFile = 'config/env/' + env + '/newrelic';
var config = false;

try {

  config = require(path.resolve(configFile)).newrelic;

} catch (e) {
  /*
  supress exception if file not found
  otherwise sails won't load
  */
}

if(config){
  (function() {
    global.newrelic = require('newrelic-config')
    .name(config.app_name)
    .key(config.license_key)
    .log(null, config.logging.level, config.logging.rules.ignore.join(','))
    .profile();
  }).call(this);
}
