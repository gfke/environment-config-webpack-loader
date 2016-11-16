var fs = require('fs'),
    qs = require('querystring'),
    _  = require('lodash');

module.exports = function (source) {
    this.cacheable && this.cacheable();

    var query      = qs.parse(this.query.replace('?', '')),
        baseConfig = JSON.parse(source);

    var environmentConfigFileName = this.resourcePath.split('.');
    //Insert environment name before the extension
    environmentConfigFileName.splice(environmentConfigFileName.length - 1, 0, query.environment || 'develop');
    environmentConfigFileName = environmentConfigFileName.join('.');

    if (fs.existsSync(environmentConfigFileName)) {
        //If a config file for the provided environmentn exists, merge it with the base
        var environmentConfigSource = fs.readFileSync(environmentConfigFileName),
            environmentConfig       = JSON.parse(environmentConfigSource);

        baseConfig = _.merge(baseConfig, environmentConfig);
    }

    return "module.exports = " + JSON.stringify(baseConfig, undefined, "\t");
}
