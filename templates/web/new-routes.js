var controller = require('../framework/controller');

var index = controller(require('./controllers/index'));

module.exports = function configureRoutes (app) {
	app.all('*', index.index);
};
