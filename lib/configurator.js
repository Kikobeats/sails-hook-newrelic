/**
 * Suppress New Relic config file loading
 */
process.env['NEW_RELIC_NO_CONFIG_FILE'] = true;

/**
 * Disable new relic logging by default
 */
process.env['NEW_RELIC_LOG_LEVEL'] = 'info';
process.env['NEW_RELIC_LOG'] = '/dev/null';

var NewRelic = function() {
};

/**
 * enabled - set agent status
 * @param {Boolean|String} enabled - whether agent is enabled
 * @returns {NewRelic} - for chaining
 */
NewRelic.prototype.enabled = function(enabled) {
  process.env['NEW_RELIC_ENABLED'] = enabled;
  return this;
};

/**
 * name - set application name
 * @param {String, Array} name - application name
 * @returns {NewRelic} - for chaining
 */
NewRelic.prototype.name = function(name) {
  process.env['NEW_RELIC_APP_NAME'] = name;
  return this;
};

/**
 * key - set license key
 * @param {String} key - license key
 * @returns {NewRelic} - for chaining
 */
NewRelic.prototype.key = function(key) {
  process.env['NEW_RELIC_LICENSE_KEY'] = key;
  return this;
};

/**
 * apdex - set apdex_t constant
 * @param {Number|String} time - time in seconds
 * @returns {NewRelic} - for chaining
 */
NewRelic.prototype.apdex = function(time) {
  process.env['NEW_RELIC_APDEX'] = 0.100;
  if (time) {
    process.env['NEW_RELIC_APDEX'] = time;
  }
  return this;
};

/**
 * log - set log destination
 * @param {String} dest - log file destination, defaults to /dev/null if falsy
 * @param {String} level - logging level {fatal, error, warn, info, debug, trace}
 * @param {String} ignore - rules to ignore}
 * @returns {NewRelic} - for chaining
 */
NewRelic.prototype.log = function(dest, level, ignore) {
  process.env['NEW_RELIC_LOG_LEVEL'] = level;
  if (dest) {
    process.env['NEW_RELIC_LOG'] = dest;
  }
  if (ignore) {
    process.env['NEW_RELIC_IGNORING_RULES'] = ignore.join(',');
  }
  return this;
};

/**
 * proxy - set proxy settings
 * @param {String} host - set proxy hostname
 * @param {Number} port - set proxy port
 * @param {String} user - set proxy user
 * @param {String} pass - set proxy pass
 * @param {String} url - proxy url overrides other proxy settings
 * @returns {NewRelic} - for chaining
 */
NewRelic.prototype.proxy = function(host, port, user, pass, url) {
  if (url) {
    process.env['NEW_RELIC_PROXY_URL'] = url;
  }
  if (host) {
    process.env['NEW_RELIC_PROXY_HOST'] = host;
  }
  if (port) {
    process.env['NEW_RELIC_PROXY_PORT'] = port;
  }
  if (user) {
    process.env['NEW_RELIC_PROXY_USER'] = user;
  }
  if (pass) {
    process.env['NEW_RELIC_PROXY_PASS'] = pass;
  }
  return this;
};

/**
 * errors - enable error tracing
 * @param {Object} params
 * @param {Boolean|String} params.enabled - enable error tracing
 * @param {Array} params.ignore_status_codes - status codes to ignore
 * @returns {NewRelic} - for chaining
 */
NewRelic.prototype.errors = function(params) {
  process.env['NEW_RELIC_ERROR_COLLECTOR_ENABLED'] = true;

  if (params && params.enabled) {
    process.env['NEW_RELIC_ERROR_COLLECTOR_ENABLED'] = params.enabled;
  }
  if (params && params.ignore_status_codes) {
    process.env['NEW_RELIC_ERROR_COLLECTOR_IGNORE_ERROR_CODES'] = params.ignore_status_codes.join(',');
  }
  return this;
};

/**
 * transaction tracing module
 *
 * @param {Object} params
 * @param {Boolean|String} params.enabled
 * @param {Number|String} params.transaction_threshold - tracing threshold in seconds or constant name
 * @param {Number} params.top_n - record top N transactions
 * @param {String} params.record_sql - record slow sqls, can be "off", "obfuscated", "raw"
 * @param {Number} params.explain_threshold - slow query threshold in ms
 * @returns {NewRelic} for chaining
 */
NewRelic.prototype.transactionTracer = function(params) {
  process.env['NEW_RELIC_TRACER_ENABLED'] = true;
  process.env['NEW_RELIC_TRACER_THRESHOLD'] = 'apdex_f';
  process.env['NEW_RELIC_TRACER_TOP_N'] = 20;
  process.env['NEW_RELIC_RECORD_SQL'] = 'off';
  process.env['NEW_RELIC_EXPLAIN_THRESHOLD'] = 500;

  if (params && params.enabled) {
    process.env['NEW_RELIC_TRACER_ENABLED'] = params.enabled;
  }
  if (params && params.transaction_threshold) {
    process.env['NEW_RELIC_TRACER_THRESHOLD'] = params.transaction_threshold;
  }
  if (params && params.top_n) {
    process.env['NEW_RELIC_TRACER_TOP_N'] = params.top_n;
  }
  if (params && params.record_sql) {
    process.env['NEW_RELIC_RECORD_SQL'] = params.record_sql;
  }
  if (params && params.explain_threshold) {
    process.env['NEW_RELIC_EXPLAIN_THRESHOLD'] = params.explain_threshold;
  }
  return this;
};

/**
 * Trace slow SQL
 * @param params
 * @param {Boolean|String} params.enabled - set tracing status
 * @param {Number} params.max_samples - max number of slow sql queries to record
 * @returns {NewRelic}
 */
NewRelic.prototype.slowSQL = function(params) {
  process.env['NEW_RELIC_SLOW_SQL_ENABLED'] = 'false';
  process.env['NEW_RELIC_MAX_SQL_SAMPLES'] = 10;

  if (params && params.enabled) {
    process.env['NEW_RELIC_SLOW_SQL_ENABLED'] = params.enabled;
  }
  if (params && params.max_samples) {
    process.env['NEW_RELIC_MAX_SQL_SAMPLES'] = params.max_samples;
  }
  return this;
};

/**
 * setup - start the profiler
 */
NewRelic.prototype.setup = function() {
  return require('newrelic');
};

module.exports = new NewRelic();
