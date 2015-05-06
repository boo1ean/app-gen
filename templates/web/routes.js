var {{{ plural }}} = controller(require('./controllers/{{{ plural }}}'));

module.exports = function configureRoutes (app) {
	app.get('/api/{{{ plural }}}', {{{ plural }}}.query);
	app.post('/api/{{{ plural }}}', {{{ plural }}}.create);
	app.put('/api/{{{ plural }}}/:id', {{{ plural }}}.update);
	app.get('/api/{{{ plural }}}/:id', {{{ plural }}}.find);
	app.delete('/api/{{{ plural }}}/:id', {{{ plural }}}.remove);
