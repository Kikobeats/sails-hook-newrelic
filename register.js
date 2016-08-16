'use strict';

var path = require('path');

var configFile = '../../config/newrelic';
var config = require(path.resolve(__dirname, configFile)).newrelic;

var env = process.env.NODE_ENV;
if (!env) {
  env = 'development';
}

try {
  var envFolderConfigFile = '../../config/env/' + env + '/newrelic';
  var envFolderConfig = require(path.resolve(__dirname, envFolderConfigFile)).newrelic;
  Object.assign(config, envFolderConfig);
} catch(e) {
  /*
   supress exception if file not found
   otherwise sails won't load
   */
}

try {
  var envConfigFile = '../../config/env/' + env;
  var envConfig = require(path.resolve(__dirname, envConfigFile)).newrelic;
  Object.assign(config, envConfig);
} catch(e) {
  /*
   supress exception if file not found
   otherwise sails won't load
   */
}

try {
  var localConfigFile = '../../config/local';
  var localConfig = require(path.resolve(__dirname, localConfigFile)).newrelic;
  Object.assign(config, localConfig);
} catch(e) {
  /*
   supress exception if file not found
   otherwise sails won't load
   */
}

(function() {
  global.newrelic = require('./lib/configurator')
    .enabled(config.agent_enabled)
    .name(config.app_name)
    .key(config.license_key)
    .proxy(config.proxy_host, config.proxy_port, config.proxy_user, config.proxy_pass, config.proxy)
    .log(null, config.logging.level, config.rules.ignore)
    .apdex(config.apdex_t)
    .errors(config.error_collector)
    .transactionTracer(config.transaction_tracer)
    .slowSQL(config.slow_sql)
    .setup();
}).call(this);
