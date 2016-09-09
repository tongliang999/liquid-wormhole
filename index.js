/* jshint node: true */
'use strict';

var filterInitializers = require('fastboot-filter-initializers');

module.exports = {
  name: 'zbj-liquid-wormhole',

  preconcatTree: function(tree) {
    return filterInitializers(tree, this.app.name);
  }
};
