'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('../routes/routes');

var _routes2 = _interopRequireDefault(_routes);

var _invalidUrl = require('../middlewares/invalidUrl');

var _invalidUrl2 = _interopRequireDefault(_invalidUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  // parse incoming requests data
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));

  app.use('/api/v1', _routes2.default);
  app.use(_invalidUrl2.default);
};